import reducerComment from "./commentSlice";
import reducerFollow from "./followSlice";
import reducerNotification from "./notificationsSlice";
import reducerTweet from "./tweetSlice";
import reducerUser from "./userSlice";

const rootReuducer = {
  users: reducerUser,
  follow: reducerFollow,
  tweet: reducerTweet,
  comment: reducerComment,
  notification: reducerNotification,
};

export default rootReuducer;
