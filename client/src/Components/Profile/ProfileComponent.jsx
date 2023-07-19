import React, { useEffect, useState } from "react";
import "./ProfileComponent.css";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import Tweet from "../Tweet/Tweet";
import Followers from "../Followers/Followers";
import Following from "../Following/Following";
import BaseAxios from "../../axiosClient/axiosConfig";
import { UserAPI } from "../../axiosClient/userAPI";
import { useDispatch, useSelector } from "react-redux";
import { getMeProfile } from "../../redux/reducer/userSlice";
import { useLocation, useParams } from "react-router-dom";
import { getTweetForMe } from "../../redux/reducer/tweetSlice";
import axios from "axios";

const ProfileComponent = ({ isUpdate, setIsUpdate }) => {
  const location = useLocation(); //lấy đường dẫn
  const params = useParams(); //Lấy param id truyền lên nếu có
  const id = params?.id; // lấy ra ID User được truyền lên

  const userLogin = JSON.parse(localStorage.getItem("login-user"));
  const [activeTab, setActiveTab] = useState("Tweets");
  const [userInfo, setUserInfo] = useState();
  const [isUpdateFollower, setIsUpdateFollower] = useState(false);
  const userStore = useSelector((state) => state.users);
  const [tweets, setTweets] = useState([]); //set UserState cho mảng Tweet được render ra
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  //Xủ lý Tab đang active
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const dispatch = useDispatch();

  //Xử lý isUpdate để render khi follow
  const handleSetIsUpdate = () => {
    setIsUpdateFollower(!isUpdateFollower);
  };

  useEffect(() => {
    dispatch(getMeProfile(userLogin._id)).unwrap();
    // console.log(userStore);
    setUserInfo(userStore);
  }, []);

  //Lấy bài tweet của current user
  const getMyTweets = async () => {
    const data = await dispatch(getTweetForMe()).unwrap();
    // console.log(data.tweets);
    setTweets(data.tweets);
  };

  //Lấy bài tweet theo ID
  const getTweetsById = async (id) => {
    const response = await axios.get(`http://localhost:4000/tweets/user/${id}`);
    // console.log(response.data.tweets);
    setTweets(response.data.tweets);
  };

  useEffect(() => {
    if (!id) {
      getMyTweets();
    } else {
      getTweetsById(id);
    }
  }, [id, isUpdate]);

  return (
    <div className="profile-content">
      <ProfileInfo
        setIsUpdateFollower={handleSetIsUpdate}
        setShowEditProfileModal={setShowEditProfileModal}
        showEditProfileModal={showEditProfileModal}
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
      />
      <div className="profile-menu">
        <div
          className={`menu-item ${activeTab === "Tweets" ? "active" : ""}`}
          onClick={() => handleTabClick("Tweets")}
        >
          Tweets
        </div>
        <div
          className={`menu-item ${activeTab === "Follwers" ? "active" : ""}`}
          onClick={() => handleTabClick("Follwers")}
        >
          Follwers
        </div>
        <div
          className={`menu-item ${activeTab === "Following" ? "active" : ""}`}
          onClick={() => handleTabClick("Following")}
        >
          Following
        </div>
      </div>

      {/* HIỂN THỊ THEO TAB KHI ACTIVE */}
      {activeTab === "Tweets" ? (
        tweets.map((tweet) => (
          <Tweet
            tweet={tweet}
            key={tweet._id}
            setTweets={setTweets}
            getMyTweets={getMyTweets}
            getTweetsById={getTweetsById}
          />
        ))
      ) : activeTab === "Follwers" ? (
        <Followers isUpdateFollower={isUpdateFollower} />
      ) : (
        <Following />
      )}
    </div>
  );
};

export default ProfileComponent;
