import React, { useEffect, useState } from "react";
import "./Notification.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getNotificationsByUserLogin } from "../../redux/reducer/notificationsSlice";
import moment from "moment"; // Import thư viện moment

const Notification_Component = (isUpdateNoti, setIsUpdateNoti) => {
  const [activeTab, setActiveTab] = useState("All");
  const [notifications, setNotifications] = useState([]);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const dispatch = useDispatch();
  const userLogin = JSON.parse(localStorage.getItem("login-user"));

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

  const getNotifications = async (userId) => {
    const response = await dispatch(
      getNotificationsByUserLogin(userId)
    ).unwrap();
    console.log(response);
    setNotifications(response.notifications);
  };

  useEffect(() => {
    getNotifications(userLogin._id);
  }, []);

  return (
    <div className="notifications-container">
      <h4 className="p-2">Notifications</h4>
      <div className="notification-menu">
        <div
          className={`menu-item ${activeTab === "All" ? "active" : ""}`}
          onClick={() => handleTabClick("All")}
        >
          All
        </div>
        <div
          className={`menu-item ${activeTab === "Verified" ? "active" : ""}`}
          onClick={() => handleTabClick("Verified")}
        >
          Verified
        </div>
        <div
          className={`menu-item ${activeTab === "Mention" ? "active" : ""}`}
          onClick={() => handleTabClick("Mention")}
        >
          Mention
        </div>
      </div>

      {notifications.map((noti) => (
        <div className="notification" key={noti._id}>
          <Link to={`/profile/${noti.sender._id}`} className="avatar">
            <img src={noti.sender.avatar} alt="Avatar" />
          </Link>
          <div className="notification-content">
            <Link to={"/profile-user"} className="header nav-link">
              <span className="fullname">{noti.sender.fullname}</span>{" "}
              <span className="username">@ {noti.sender.username}</span>
              <span className="date">{formatTimestamp(noti.createdAt)}</span>
            </Link>
            <div className="content">
              {noti.type}
              <Link to={`/post-detail/${noti.tweetId}`} className="mx-2">
                your tweet
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification_Component;
