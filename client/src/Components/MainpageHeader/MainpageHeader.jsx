import React, { useState } from "react";
import PhotoIcon from "@mui/icons-material/Photo";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import "./MainpageHeader.css";
import { useEffect } from "react";
import axios from "axios";
const token = JSON.parse(localStorage.getItem("accessToken"));

const MainpageHeader = ({ isUpdate, setIsUpdate }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const userLogin = JSON.parse(localStorage.getItem("login-user"));
  const [inputValue, setInputValue] = useState("");

  //Xử lý emoji
  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelect = (emoji) => {
    setInputValue(inputValue + " " + emoji?.native);
  };

  //Xử lý sự kiện để show và xoá các ảnh được chọn
  const handleImageSelect = (event) => {
    const files = event.target.files;
    const selected = Array.from(files);
    setSelectedImages([...selectedImages, ...selected]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  //Xử lý sự kiện input
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  //Xử lý sự kiện post tweet  submit
  const handlePostNewTweet = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("type", "tweet");
    formData.append("content", inputValue);
    // Nối Images
    selectedImages.forEach((image, index) => {
      formData.append("images", image, `image-${index}-${image.name}`); //Tên phải khớp với multer bên server
    });

    postNewTweet(formData);
    setSelectedImages([]);
    setInputValue("");
  };

  //Function post bài twitter tweet từ API
  const postNewTweet = async (tweet) => {
    try {
      await axios
        .post("http://localhost:4000/tweets", tweet, {
          headers: {
            "Content-Type": "multipart/form-data",
            " Authorization": `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setIsUpdate(!isUpdate);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-page-header">
      <h4 className="fw-bold">Home</h4>
      <div className="tweetbox">
        <form
          className="form-new-tweet"
          onSubmit={handlePostNewTweet}
          encType="multipart/form-data"
          method="post"
        >
          <div className="form-group">
            <div className="userAlphabet">
              <img src={userLogin.avatar} alt="avt" className="avt-user" />
            </div>
            <input
              type="text"
              name="input-new-tweet"
              id="input-new-tweet"
              placeholder="Write your tweet today"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <div className="show-images">
            {selectedImages.map((image, index) => (
              <div key={index} className="image-container">
                <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
                <span onClick={() => handleRemoveImage(index)}>X</span>
              </div>
            ))}
          </div>
          <div className="form-bottom">
            <label htmlFor="img-tweet">
              <PhotoIcon />
            </label>
            <input
              type="file"
              multiple
              id="img-tweet"
              name="images"
              onChange={handleImageSelect}
            />
            <label htmlFor="emoji-tweet" onClick={handleToggleEmojiPicker}>
              <InsertEmoticonIcon />
            </label>
            <input type="submit" value="TWEET" className="btn-new-tweet" />
          </div>
        </form>
        {showEmojiPicker && (
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        )}
      </div>
    </div>
  );
};

export default MainpageHeader;
