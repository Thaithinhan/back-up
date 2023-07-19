import React from "react";
import TopSidebar from "./TopSidebar";
import BottomSidebar from "./BottomSidebar";
import "./SidebarComponent.css";

const SidebarComponent = ({
  isUpdate,
  setIsUpdate,
  isUpdateNoti,
  setIsUpdateNoti,
}) => {
  console.log(isUpdateNoti);

  return (
    <div className="sidebar">
      <TopSidebar
        isUpdateNoti={isUpdateNoti}
        setIsUpdateNoti={setIsUpdateNoti}
      />
      <BottomSidebar isUpdate={isUpdate} />
    </div>
  );
};

export default SidebarComponent;
