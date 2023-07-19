import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deleteTweet } from "../../../redux/reducer/tweetSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getCommentByTweetId } from "../../../redux/reducer/commentSlice";

function DeleteModal({
  showDeleteModal,
  setShowDeleteModal,
  tweet,
  setTweets,
  setComments,
}) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const id = useParams().id;
  const location = useLocation();

  const handleClose = () => {
    setShow(false);
    setShowDeleteModal(false);
  };

  useEffect(() => {
    setShow(showDeleteModal);
  }, [showDeleteModal]);

  //Xử lý remove Tweet
  const handleRemoveTweet = async () => {
    const data = await dispatch(deleteTweet(tweet._id));
    handleClose();
    getTweetsOnNewFeed();
    getCommentOfCurrentTweet(id);
    if (tweet._id === id) {
      navigate("/home");
    }
  };

  //Gọi API get lại các tweets
  const getTweetsOnNewFeed = async () => {
    const response = await axios.get(
      "http://localhost:4000/tweets/getTweetByTime",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    //     console.log(response.data.tweets);
    setTweets(response.data.tweets);
  };

  //Get comments for current tweet
  const getCommentOfCurrentTweet = async (id) => {
    try {
      const data = await dispatch(getCommentByTweetId(id)).unwrap();
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to delete Tweet {tweet?.content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleRemoveTweet}>
          REMOVE
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
