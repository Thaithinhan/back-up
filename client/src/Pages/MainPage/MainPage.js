import React from "react";
import SidebarComponent from "../../Components/Sidebar/SidebarComponent";
import { Container } from "react-bootstrap";
import MainpageComponent from "../../Components/MainpageComponent/MainpageComponent";
import RightBar from "../../Components/RightBar/RightBar";

const MainPage = () => {
  return (
    <div className="wrapper">
      <Container className="d-lg-flex">
        <SidebarComponent />
        <MainpageComponent />
        <RightBar />
      </Container>
    </div>
  );
};

export default MainPage;
