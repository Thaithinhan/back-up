import React, { useEffect, useState } from "react";
import "./ProfileInfo.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { checkVerifyUser, getUserById } from "../../redux/reducer/userSlice";
import { VscVerifiedFilled } from "react-icons/vsc";
import {
  checkFollow,
  makeFollowing,
  unFollow,
} from "../../redux/reducer/followSlice";
import EditModalProfile from "../Modals/EditProfileModal/EditProfileModal";

const ProfileInfo = ({
  setIsUpdateFollower,
  setShowEditProfileModal,
  showEditProfileModal,
  setIsUpdate,
  isUpdate,
}) => {
  const location = useLocation();
  const params = useParams();
  const id = params?.id;
  // console.log(params.id);
  const userStore = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [isFollow, setIsFollow] = useState(false);
  const userLogin = JSON.parse(localStorage.getItem("login-user"));
  const [isVerified, setIsVerified] = useState(false);

  const fetchUserbyId = async () => {
    const data = await dispatch(getUserById(id)).unwrap();
    setUser(data);
  };

  // console.log(setIsUpdate);

  const checkFollowing = async () => {
    const data = await dispatch(checkFollow(user)).unwrap();
    setIsFollow(data.isFollowing);
  };

  useEffect(() => {
    if (id) {
      fetchUserbyId();
    }
  }, [id]);

  useEffect(() => {
    if (user) {
      checkFollowing();
    }
  }, [user]);

  useEffect(() => {
    const checkVerificationStatus = async () => {
      try {
        const response = await dispatch(checkVerifyUser(userLogin._id));
        setIsVerified(response.payload.isVerified);
      } catch (error) {
        console.error(error);
      }
    };

    checkVerificationStatus();
  }, []);

  //XỬ LÝ FOLLOW
  const handleFollowing = async (user) => {
    const data = await dispatch(makeFollowing(user)).unwrap();
    checkFollowing();
    setIsUpdateFollower();
  };

  //Xử lý Unfollow
  const handleUnFollowing = async (user) => {
    await dispatch(unFollow(user)).unwrap();
    checkFollowing();
    setIsUpdateFollower();
  };

  //Xử lý sự kiện mở Modal Edit
  const handleOpenProfileModal = () => {
    setShowEditProfileModal(true);
  };

  return (
    <div className="profile-info">
      <div className="user-imgs-info">
        <h4 className="fw-bold p-2">
          {id ? user?.fullname : userLogin?.fullname}
        </h4>
        <div className="cover-img">
          <img
            src={id ? user?.cover_photo : userLogin?.cover_photo}
            alt="cover-page"
          />
        </div>
        <div className="avt-img">
          <img src={id ? user?.avatar : userLogin?.avatar} alt="avt-page" />
        </div>
        {location.pathname === "/my-profile" || userLogin?._id === id ? (
          <button
            className="btn btn-outline-primary btn-edit-profile"
            onClick={handleOpenProfileModal}
          >
            Edit Profile
          </button>
        ) : isFollow ? (
          <button
            className="btn btn-outline-dark btn-follow btn-unfollow"
            onClick={() => handleUnFollowing(user)}
          >
            Unfollow
          </button>
        ) : (
          <button
            className="btn btn-outline-dark btn-follow"
            onClick={() => handleFollowing(user)}
          >
            Follow
          </button>
        )}
      </div>
      <div className="user-profile-info px-4">
        <h5 className="fullname mt-2">
          <b>{id ? user?.fullname : userLogin?.fullname}</b>
          {isVerified && <VscVerifiedFilled className="text-primary" />}
        </h5>
        <p className="username text-secondary">
          @{id ? user?.username : userLogin.username}
        </p>
      </div>
      <EditModalProfile
        setShowEditProfileModal={setShowEditProfileModal}
        showEditProfileModal={showEditProfileModal}
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
      />
    </div>
  );
};

export default ProfileInfo;
