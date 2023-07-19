import React, { useState } from "react";
import "./CommentForm.css";
import { AiOutlinePicture } from "react-icons/ai"; // For image icon
import { BsFillSendFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  getCommentByTweetId,
} from "../../redux/reducer/commentSlice";
import { useLocation } from "react-router-dom";
import axios from "axios";
const token = JSON.parse(localStorage.getItem("accessToken"));

const CommentForm = ({
  parentId,
  setComments,
  comments,
  setTweets,
  setCommentCount,
  // getCommentCount,
}) => {
  const [images, setImages] = useState([]);
  const [contentComment, setContentComment] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();

  const handleImageChange = (e) => {
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const handleImageRemove = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  //Sự kiện Onchange ô input
  const handleInputChange = (e) => {
    setContentComment(e.target.value);
  };

  //Sự kiện submit form
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("parentId", parentId);
    formData.append("content", contentComment);
    // Nối Images
    images.forEach((image, index) => {
      formData.append("images", image, `image-${index}-${image.name}`); //Tên phải khớp với multer bên server
    });

    const data = postNewComment(formData);
    setContentComment("");

    // getCommentCount(parentId);
    if (location.pathname !== `/home`) {
      setTweets((prevArray) => [...prevArray, data]);
      getCommentOfCurrentTweet(parentId);
    }
  };

  //Function post bài twitter tweet từ API
  const postNewComment = async (tweet) => {
    try {
      await axios
        .post("http://localhost:4000/comments", tweet, {
          headers: {
            "Content-Type": "multipart/form-data",
            " Authorization": `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          return response.data;
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  //Render ngay khi comment xong
  // Lấy comment theo IDtweet

  const getCommentOfCurrentTweet = async (id) => {
    try {
      const data = await dispatch(getCommentByTweetId(id)).unwrap();
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (event) => {
    event.stopPropagation();
    // code to handle click event
  }; //stop event propagation

  return (
    <form
      className="comment-form"
      onSubmit={handleSubmit}
      onClick={handleClick}
    >
      <div className="comment-form__images">
        {images.map((image, index) => (
          <div key={index} className="comment-form__image">
            <img src={URL.createObjectURL(image)} alt="Preview" />
            <button
              onClick={() => handleImageRemove(index)}
              className="remove-image-comment-button"
            >
              X
            </button>
          </div>
        ))}
      </div>
      <textarea
        placeholder="Write your comment..."
        name="content"
        onChange={handleInputChange}
        value={contentComment}
      ></textarea>
      <label className="img-comment text-primary">
        <AiOutlinePicture size={20} />
        <input
          type="file"
          onChange={handleImageChange}
          multiple
          accept="image/*"
          hidden
          name="images"
        />
      </label>
      <button type="submit" className="btn-sendcomment text-primary">
        <BsFillSendFill />
      </button>
    </form>
  );
};

export default CommentForm;
