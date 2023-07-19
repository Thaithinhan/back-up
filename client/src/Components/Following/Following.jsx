import React, { useEffect, useState } from "react";
import "./Following.css";
import { useDispatch } from "react-redux";
import {
  getFollowing,
  getFollowingById,
  unFollow,
} from "../../redux/reducer/followSlice";
import { Link, useLocation, useParams } from "react-router-dom";

const Following = () => {
  const location = useLocation();
  const params = useParams();
  const id = params?.id;
  const dispatch = useDispatch();
  const [followings, setFollowings] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const [isUpdate, setIsUpdate] = useState(true);

  const fetchFollowingsForLoginUser = async () => {
    const data = await dispatch(getFollowing()).unwrap();
    setFollowings(data);
  };

  const fetchFollowingsById = async () => {
    const data = await dispatch(getFollowingById(id)).unwrap();
    setFollowings(data);
  };

  // console.log(id);

  useEffect(() => {
    if (!id) {
      fetchFollowingsForLoginUser();
    } else {
      fetchFollowingsById(id);
    }
  }, [id, isUpdate]);

  //Handle Unfollow nhấn nút
  const handleUnfollow = async (user) => {
    console.log(user._id);
    await dispatch(unFollow(user)).unwrap();
    setIsUpdate(!isUpdate);
  };

  // console.log(followings);

  return (
    <div className="following-wrapper">
      {followings.map((item) => (
        <div className="following-component" key={item._id}>
          <Link
            to={`/profile/${item.followed_userId._id}`}
            className="following-user nav-link"
          >
            <div className="user-img">
              <img src={item.followed_userId.avatar} alt="avatar" />
            </div>
            <div>
              <h5 className="fw-bold">{item.followed_userId.fullname}</h5>
              <p className="text-secondary m-0">
                @{item.followed_userId.username}3
              </p>
            </div>
          </Link>
          <button
            className=" btn-unfollowing"
            onClick={() => handleUnfollow(item.followed_userId)}
          >
            Unfollow
          </button>
        </div>
      ))}
    </div>
  );
};

export default Following;
