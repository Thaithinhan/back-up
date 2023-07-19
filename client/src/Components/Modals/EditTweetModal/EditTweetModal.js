import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { editTweet } from "../../../redux/reducer/tweetSlice";
import { getCommentByTweetId } from "../../../redux/reducer/commentSlice";

function EditModalTweet({
  showEditModal,
  setShowEditModal,
  tweet,
  setTweets,
  setTweetParent,
  setComments,
}) {
  const [show, setShow] = useState(false);
  const [contentInput, setContentInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const id = useParams().id;

  const handleClose = () => {
    setShow(false);
    setShowEditModal(false);
  };

  useEffect(() => {
    setShow(showEditModal);
    setContentInput(tweet?.content);
  }, [showEditModal, tweet]);

  //Xử lý Input
  const handleContent = (e) => {
    setContentInput(e.target.value);
  };

  //Xử lý Edit Tweet
  const handleEditTweet = async () => {
    tweet.content = contentInput;
    const data = await dispatch(editTweet(tweet)).unwrap();

    if (location.pathname === "/home") {
      getTweetsOnNewFeed();
    } else {
      getTweetByIdTweet(data.tweet._id);
      getCommentOfCurrentTweet(id);
    }

    handleClose();
  };

  //Lấy dữ liệu tweet theo ID
  const getTweetByIdTweet = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/tweets/${id}`);
      setTweetParent(response.data.tweet);
    } catch (error) {
      console.log(error);
    }
  };

  //Gọi API get lại các tweets
  const getTweetsOnNewFeed = async () => {
    const response = await axios.get(
      "http://localhost:4000/tweets/getTweetByTime",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // console.log(response.data.tweets);
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
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Content Tweet</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              name="content"
              value={contentInput}
              onChange={handleContent}
            />
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              CLOSE
            </Button>
            <Button variant="primary" onClick={handleEditTweet}>
              EDIT
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditModalTweet;
