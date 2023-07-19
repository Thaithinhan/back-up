import React from "react";
import WidgetComponent from "../WidgetComponent/WidgetComponent";
import FollowSuggest from "../FollowSuggest/FollowSuggest";
import"./RightBar.css"

const RightBar = () => {
  return (
    <div className="right-bar">
      <WidgetComponent />
      <FollowSuggest />
    </div>
  );
};

export default RightBar;
