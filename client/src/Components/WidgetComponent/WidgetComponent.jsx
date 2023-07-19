import React from "react";
import "./WidgetComponent.css";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from "react-twitter-embed";
import SearchIcon from "@mui/icons-material/Search";

function WidgetComponent() {
  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widgets__SearchIcon" />
        <input placeholder="Search Twitter" type="text" />
      </div>
      <div className="widgets__widgetContainer">
        <h2>Whats'happening</h2>
        <TwitterTweetEmbed tweetId={"1321351808086798343"} />

        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="akky_im"
          options={{ height: 400 }}
        />

        <TwitterShareButton
          url={"https://facebook.com/akkyProjects"}
          options={{
            text: "Subscribe my Youtube Channel #CodeWithAkky",
            via: "akkyProjects",
          }}
        />
      </div>
    </div>
  );
}

export default WidgetComponent;
