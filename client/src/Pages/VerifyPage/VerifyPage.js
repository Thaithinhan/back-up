import React from "react";
import { Container } from "react-bootstrap";
import SidebarComponent from "../../Components/Sidebar/SidebarComponent";
import VerifyAccount from "../../Components/VerifyComponent/VerifyComponent";
import RightBar from "../../Components/RightBar/RightBar";

const VerifyPage = () => {
  return (
    <div className="verify-page">
      <Container className="d-lg-flex">
        <SidebarComponent />
        <VerifyAccount />
        <RightBar />
      </Container>
    </div>
  );
};

export default VerifyPage;
