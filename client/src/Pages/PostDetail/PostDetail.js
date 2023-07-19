import React from "react";
import PostDetailComponent from "../../Components/PostDetail/PostDetailComponent";
import SidebarComponent from "../../Components/Sidebar/SidebarComponent";
import RightBar from "../../Components/RightBar/RightBar";
import { Container } from "react-bootstrap";

const PostDetail = () => {
  return (
    <div className="post-detail-page">
      <Container className="d-lg-flex">
        <SidebarComponent />
        <PostDetailComponent />
        <RightBar />
      </Container>
    </div>
  );
};

export default PostDetail;
