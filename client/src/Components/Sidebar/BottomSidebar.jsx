import React from "react";
import "./BottomSidebar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const BottomSidebar = ({ isUpdate }) => {
  const userLogin = JSON.parse(localStorage.getItem("login-user"));
  const [userCurrent, setUserCurrent] = useState(userLogin);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("login-user");
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  useEffect(() => {
    setUserCurrent(userLogin);
  }, [isUpdate]);

  return (
    <div className="bottom-sidebar">
      <div className="loginUser-info">
        <div className="userAlphabet">
          <img src={userCurrent?.avatar} alt="avt" className="avt-user" />
        </div>
        <div className="username-content">
          <b className="emailname_info">{userCurrent?.fullname}</b>
          <p className="username-info m-0 text-secondary">
            @{userCurrent?.username}
          </p>
        </div>
      </div>
      <button
        className="btn-logout btn btn-outline-primary"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
};

export default BottomSidebar;
