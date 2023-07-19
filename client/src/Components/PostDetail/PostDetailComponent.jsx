import React, { useState } from "react";
import "./PostDetailComponent.css";
import Tweet from "../Tweet/Tweet";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCommentByTweetId } from "../../redux/reducer/commentSlice";

const PostDetailComponent = () => {
  const [showComment, setShowComment] = useState(true);
  const [tweetParent, setTweetParent] = useState();
  const [comments, setComments] = useState([]);
  const [subComments, setSubComment] = useState({});
  const [tweets, setTweets] = useState([]);
  const params = useParams();
  const idTweet = params.id;
  const dispatch = useDispatch();

  //Lấy dữ liệu tweet theo ID
  const getTweetByIdTweet = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/tweets/${id}`);
      setTweetParent(response.data.tweet);
    } catch (error) {
      console.log(error);
    }
  };

  //Lấy dữ liệu commnet theo comment chính
  const getSubCommentsByCommentId = async (commentId) => {
    try {
      const data = await dispatch(getCommentByTweetId(commentId)).unwrap();
      setSubComment((prev) => ({
        ...prev,
        [commentId]: data,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // Lấy comment theo IDtweet

  const getCommentOfCurrentTweet = async (id) => {
    try {
      const data = await dispatch(getCommentByTweetId(id)).unwrap();
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTweetByIdTweet(idTweet);
    getCommentOfCurrentTweet(idTweet);
  }, [idTweet, tweets]);

  useEffect(() => {
    if (comments.length > 0) {
      comments.forEach((comment) => getSubCommentsByCommentId(comment._id));
    }
  }, [comments, tweets]);

  return (
    <div className="post-detail-component">
      <h4 className="p-2 fw-bold">Tweets</h4>
      <div className="post-detail-header">
        <Tweet
          tweet={tweetParent}
          setTweetParent={setTweetParent}
          setTweets={setTweets}
          getTweetByIdTweet={getTweetByIdTweet}
        />
      </div>
      <div className="list-comments my-4">
        <h6 onClick={() => setShowComment(!showComment)} className="fw-bold">
          <b>{showComment ? "Hidden comments" : "Show comments"}</b>
        </h6>
        <div className="show-list-comment">
          {" "}
          {showComment &&
            comments.map((comment) => (
              <>
                <Tweet
                  key={comment._id}
                  tweet={comment}
                  setComments={setComments}
                  comments={comments}
                  setTweets={setTweets}
                  getTweetByIdTweet={getTweetByIdTweet}
                  getCommentOfCurrentTweet={getCommentOfCurrentTweet}
                />
                {subComments[comment._id] &&
                  subComments[comment._id].map((subcomment) => (
                    <div className="sub-comment">
                      <Tweet
                        key={subcomment._id}
                        tweet={subcomment}
                        setComments={setComments}
                        comments={comments}
                        setTweets={setTweets}
                        getTweetByIdTweet={getTweetByIdTweet}
                      />
                    </div>
                  ))}
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetailComponent;
