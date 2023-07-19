import React, { useState } from "react";
import { Container } from "react-bootstrap";
import SidebarComponent from "../../Components/Sidebar/SidebarComponent";
import RightBar from "../../Components/RightBar/RightBar";
import Notification_Component from "../../Components/Notification/Notification_Component";

const Notification = () => {
  const [isUpdateNoti, setIsUpdateNoti] = useState(false);

  return (
    <div className="wrapper-notification">
      <Container className="d-lg-flex">
        <SidebarComponent
          isUpdateNoti={isUpdateNoti}
          setIsUpdateNoti={setIsUpdateNoti}
        />
        <Notification_Component
          isUpdateNoti={isUpdateNoti}
          setIsUpdateNoti={setIsUpdateNoti}
        />
        <RightBar />
      </Container>
    </div>
  );
};

export default Notification;
