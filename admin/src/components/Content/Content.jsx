import React from "react";
import { Route, Routes } from "react-router-dom";
import ManageUser from "../ManagerUser/ManagerUser";
import ManageOrder from "../ManagerOrder/ManagerOrder";

const Content = () => {
  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<ManageUser />} />
        <Route path="/manage-user" element={<ManageUser />} />
        <Route path="/manage-order" element={<ManageOrder />} />
      </Routes>
    </div>
  );
};

export default Content;
