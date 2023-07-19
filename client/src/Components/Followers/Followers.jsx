import React, { useEffect, useState } from "react";
import "./Followers.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getFollower, getFollowerById } from "../../redux/reducer/followSlice";

const Followers = ({ isUpdateFollower }) => {
  const location = useLocation();
  const params = useParams();
  const id = params?.id;
  const dispatch = useDispatch();
  const [followers, setFollower] = useState([]);
  const [isFollow, setIsFollow] = useState(false);

  const fetchFollowersForLoginUser = async () => {
    const data = await dispatch(getFollower()).unwrap();
    setFollower(data);
  };
  const fetchFollowersbyId = async (id) => {
    const data = await dispatch(getFollowerById(id)).unwrap();
    setFollower(data);
  };

  useEffect(() => {
    if (!id) {
      fetchFollowersForLoginUser();
    } else {
      fetchFollowersbyId(id);
    }
  }, [id, isUpdateFollower]);

  // console.log(followers);

  return (
    <div className="follower-wrapper">
      {followers.map((follower) => (
        <div className="follower-component" key={follower._id}>
          <Link
            to={`/profile/${follower.current_userId._id}`}
            className="following-user nav-link"
          >
            <div className="user-img">
              <img src={follower.current_userId.avatar} alt="avatar" />
            </div>
            <div>
              <h5 className="fw-bold">{follower.current_userId.fullname}</h5>
              <p className="text-secondary m-0">
                @{follower.current_userId.username}
              </p>
            </div>
          </Link>
          <button className=" btn-following">Follow</button>
        </div>
      ))}
    </div>
  );
};

export default Followers;
