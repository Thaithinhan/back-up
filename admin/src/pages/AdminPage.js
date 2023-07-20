import React from "react";
import Sidebar from "../components/Sidebar/Sisebar";
import Content from "../components/Content/Content";
import "./AdminPage.css";

const AdminPage = () => {
  return (
    <div className="admin-page">
      <Sidebar />
      <Content />
    </div>
  );
};

export default AdminPage;
