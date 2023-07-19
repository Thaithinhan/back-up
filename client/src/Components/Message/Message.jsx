import React from "react";
import SidebarComponent from "../Sidebar/SidebarComponent";
import { Container } from "react-bootstrap";
import LeftMessageComponent from "./LeftMessageComponent";
import RightMessgae from "./RightMessgae";
import "./Message.css"

const MessageComponent = () => {
  return (
    <div className="messages">
      <Container className="d-lg-flex">
        <SidebarComponent />
        <div className="main-content-message">
          <LeftMessageComponent />
          <RightMessgae />
        </div>
      </Container>
    </div>
  );
};

export default MessageComponent;
