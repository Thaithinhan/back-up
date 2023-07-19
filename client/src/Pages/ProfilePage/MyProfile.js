import React from "react";
import ProfileComponent from "../../Components/Profile/ProfileComponent";
import SidebarComponent from "../../Components/Sidebar/SidebarComponent";
import { Container } from "react-bootstrap";
import RightBar from "../../Components/RightBar/RightBar";
import { useState } from "react";

const MyProfilePage = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <div className="profile-page">
      <Container className="d-lg-flex">
        <SidebarComponent isUpdate={isUpdate} setIsUpdate={setIsUpdate} />
        <ProfileComponent isUpdate={isUpdate} setIsUpdate={setIsUpdate} />
        <RightBar />
      </Container>
    </div>
  );
};

export default MyProfilePage;
