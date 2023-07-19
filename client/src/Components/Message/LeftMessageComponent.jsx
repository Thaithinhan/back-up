import React, { useState } from "react";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import SearchIcon from "@mui/icons-material/Search";

import "./LeftMessageComponent.css";
import { Link } from "react-router-dom";
import DropdownComponent from "../Dropdown/DropdownComponent";
const LeftMessageComponent = () => {
  return (
    <div className="message-left-content">
      <div className="message-header d-lg-flex">
        <h4 className="p-2">Messages</h4>
        <div className="create-message">
          <button className="btn btn-none">
            <ForwardToInboxIcon />
          </button>
        </div>
      </div>
      <form className="message-search-user">
        <input
          type="text"
          placeholder="Search user to chat"
          className="btn-search-user-message rounded-pill btn btn-light"
        />
        <SearchIcon className="icon-input-message" />
      </form>

      <div className="list-message">
        <div className="tweet-header px-2">
          <Link to={"#"} className="tweet-info nav-link">
            <img
              src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/325974944_1890980747908840_7410515548073747029_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=PQou7DxaYS4AX_69UV8&_nc_ht=scontent.fhan14-3.fna&oh=00_AfAkdjCUkiTJ1Ud8FU4ZgQOm7n1DPy0zA_em9ig5VJnzog&oe=64ACFE11"
              alt="Avatar"
              className="avatar"
            />
            <span className="fullname">Thái Thị Nhàn</span>
            <span className="username mx-2">@Nhanthai</span>
            <span className="timestamp">03/07/2023</span>
          </Link>
        </div>
        <div className="lastest-message px-2">
          <span>Lorem ipsum dolor sit amet.</span>
        </div>
      </div>
      <div className="list-message">
        <div className="tweet-header px-2">
          <Link to={"#"} className="tweet-info nav-link">
            <img
              src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/325974944_1890980747908840_7410515548073747029_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=PQou7DxaYS4AX_69UV8&_nc_ht=scontent.fhan14-3.fna&oh=00_AfAkdjCUkiTJ1Ud8FU4ZgQOm7n1DPy0zA_em9ig5VJnzog&oe=64ACFE11"
              alt="Avatar"
              className="avatar"
            />
            <span className="fullname">Thái Thị Nhàn</span>
            <span className="username mx-2">@Nhanthai</span>
            <span className="timestamp">03/07/2023</span>
          </Link>
        </div>
        <div className="lastest-message px-2">
          <span>Lorem ipsum dolor sit amet.</span>
        </div>
      </div>
    </div>
  );
};

export default LeftMessageComponent;
