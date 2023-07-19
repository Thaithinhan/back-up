import React, { useEffect, useState } from "react";
import "./FollowSuggest.css";
import { useDispatch } from "react-redux";
import { suggestFollower } from "../../redux/reducer/userSlice";
import { useNavigate } from "react-router-dom";
import { makeFollowing } from "../../redux/reducer/followSlice";

const FollowSuggest = () => {
  const dispatch = useDispatch();
  const [suggestUsers, setSuggestUsers] = useState([]);
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(true);

  const fetchUserSuggestFollow = async () => {
    const data = await dispatch(suggestFollower()).unwrap();
    setSuggestUsers(data);
  };

  useEffect(() => {
    fetchUserSuggestFollow();
  }, [isUpdate]);

  const handleUserClick = (id) => {
    navigate(`/profile/${id}`);
  };

  const handleFollow = async (user) => {
    await dispatch(makeFollowing(user)).unwrap();
    setIsUpdate(!isUpdate);
  };

  return (
    <div className="suggest-follow">
      <h6 className="fw-bold">WHO TO FOLLOW</h6>
      {suggestUsers?.map((user) => (
        <div
          className="content"
          onClick={() => handleUserClick(user._id)}
          key={user._id}
        >
          <div className="info-user  d-lg-flex align-items-center">
            <div className="img-avt">
              <img src={user.avatar} alt="" />
            </div>
            <div className="user-name">
              <b>{user.fullname}</b>
              <p className="text-secondary fw-bold m-0">@{user.username}</p>
            </div>
          </div>
          <div className="follow-btn">
            <button className="rounded-pill" onClick={() => handleFollow(user)}>
              Follow
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FollowSuggest;
