import React, { useEffect, useState } from "react";
import "./Tweet.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import RepeatIcon from "@mui/icons-material/Repeat";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import { VscVerifiedFilled } from "react-icons/vsc";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import DropdownComponent from "../Dropdown/DropdownComponent";
import { useDispatch } from "react-redux";
import moment from "moment"; // Import thư viện moment
import CommentForm from "../CommentForm/CommentForm";
import {
  countCommentTweet,
  likeTweet,
  unlikeTweet,
} from "../../redux/reducer/tweetSlice";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

const Tweet = ({
  tweet,
  setTweets,
  setTweetParent,
  setComments,
  comments,
  getTweetsOnNewFeed,
  getTweetByIdTweet,
  getMyTweets,
  getTweetsById,
  getCommentOfCurrentTweet,
}) => {
  const location = useLocation();
  const params = useParams();
  const id = params?.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = JSON.parse(localStorage.getItem("login-user"));
  const [isCheckFollowing, setIsCheckFollowing] = useState(false);

  // Hàm hỗ trợ để định dạng thời gian đăng bài post
  const formatTimestamp = (timestamp) => {
    // console.log(timestamp);
    const date = moment(timestamp); // Tạo đối tượng moment từ timestamp
    const now = moment(); // Đối tượng moment hiện tại

    if (now.diff(date, "days") < 1) {
      // Nếu chưa đủ 1 ngày
      return date.fromNow(); // Hiển thị dưới dạng "x phút trước", "vài giây trước",...
    } else {
      return date.format("DD/MM/YYYY"); // Hiển thị dưới dạng "ngày/tháng"
    }
  };

  //Hiển thị khi like
  const [like, setLike] = useState(false);
  useEffect(() => {
    if (tweet?.likes.findIndex((userId) => userId === userLogin._id) !== -1) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [tweet?.likes, userLogin._id]);

  const handleLike = async (e, idTweet) => {
    e.stopPropagation();
    await dispatch(likeTweet(idTweet)).unwrap();
    if (location.pathname === "/home") {
      getTweetsOnNewFeed();
    } else if (location.pathname === `/post-detail/${idTweet}`) {
      getTweetByIdTweet(idTweet);
    } else if (location.pathname === `/my-profile`) {
      getMyTweets();
    } else if (location.pathname === `/profile/${id}`) {
      getTweetsById(id);
    }
    setLike(true);

    // Gửi sự kiện 'like' tới máy chủ
    // Ngay sau khi kết nối, gửi sự kiện 'user_connected'
    socket.on("connect", function () {
      const userId = userLogin._id; // thay 'yourUserId' bằng ID người dùng thực tế của bạn
      socket.emit("like", { userId: userId, tweetId: tweet._id });
    });
  };

  const handleUnLike = async (e, idTweet) => {
    e.stopPropagation();
    await dispatch(unlikeTweet(idTweet)).unwrap();
    if (location.pathname === "/home") {
      getTweetsOnNewFeed();
    } else if (location.pathname === `/post-detail/${idTweet}`) {
      getTweetByIdTweet(idTweet);
    } else if (location.pathname === `/my-profile`) {
      getMyTweets();
    } else if (location.pathname === `/profile/${id}`) {
      getTweetsById(id);
    }
    setLike(false);
  };

  // console.log(showDropdown);

  //Chuyển trang detail  khi click vào bài tweet
  const handleNavigate = (id) => {
    navigate(`/post-detail/${id}`);
  };

  //Ngăn chặn sự kiện click truyền vào div tweet khi click vào thẻ Link
  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  //Phần comment
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentCount, setCommentCount] = useState(0); //Đếm số comment

  const getCommentCount = async (idTweet) => {
    const count = await dispatch(countCommentTweet(idTweet)).unwrap();
    setCommentCount(count);
  };

  // console.log("paramId ", id);
  useEffect(() => {
    if (id) {
      if (tweet?._id === id) {
        getCommentCount(id);
      }

      return;
    }
    getCommentCount(tweet?._id);
  }, [tweet, id]);

  const handleCommentClick = (e) => {
    e.stopPropagation();
    setShowCommentForm(!showCommentForm);
  };

  return (
    <div className="tweet nav-link" onClick={() => handleNavigate(tweet?._id)}>
      <div className="tweet-header">
        <div className="tweet-info nav-link d-flex - align-items-center">
          <Link
            to={`/profile/${tweet?.userId_tweet?._id}`}
            onClick={handleLinkClick}
          >
            {" "}
            <img
              src={tweet?.userId_tweet?.avatar}
              alt="Avatar"
              className="avatar"
            />
          </Link>
          <p className="m-0">
            <span className="fullname">{tweet?.userId_tweet?.fullname}</span>{" "}
            {tweet?.userId_tweet?.verify > 0 && (
              <VscVerifiedFilled className="text-primary" />
            )}
            <p className="username my-0">@{tweet?.userId_tweet?.username}</p>
            <span className="timestamp">
              {formatTimestamp(tweet?.createdAt)}
            </span>
          </p>
        </div>
        <DropdownComponent
          isUserTweet={tweet?.userId_tweet?._id === userLogin?._id}
          isFollowing={isCheckFollowing}
          setIsCheckFollowing={setIsCheckFollowing}
          userId_tweet={tweet?.userId_tweet}
          tweet={tweet}
          setTweets={setTweets}
          setTweetParent={setTweetParent}
          setComments={setComments}
        />
      </div>
      <div className="tweet-content">{tweet?.content}</div>

      <div className="imgs-tweets">
        {tweet?.medias?.length > 0 &&
          tweet?.medias.map((media, index) => (
            <img className="tweet-image" src={media} key={index} />
          ))}
      </div>

      <div className="tweet-footer">
        <span className="likes">
          {tweet?.likes?.length}{" "}
          {!like && (
            <FavoriteBorderIcon
              className="icon-tweet"
              onClick={(e) => handleLike(e, tweet._id)}
            />
          )}
          {like && (
            <FavoriteOutlinedIcon
              className="text-danger"
              onClick={(e) => handleUnLike(e, tweet._id)}
            />
          )}
        </span>
        <span className="retweets">
          0 <RepeatIcon className="icon-tweet" />
        </span>
        <span className="comment" onClick={handleCommentClick}>
          {commentCount} <MapsUgcOutlinedIcon className="icon-tweet" />
        </span>
      </div>
      {showCommentForm && (
        <CommentForm
          parentId={tweet._id}
          setComments={setComments}
          comments={comments}
          setTweets={setTweets}
          // getCommentCount={getCommentCount}
          setCommentCount={setCommentCount}
        />
      )}
    </div>
  );
};

export default Tweet;
