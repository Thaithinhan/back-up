import axiosClient from "./axiosConfig";

export class TweetAPI {
  //Get Tweet for current user
  static getTweetForCurrentUser() {
    const url = "/tweets/mytweet";
    return axiosClient.get(url);
  }

  //Xoá Tweet
  static deleteTweet(id) {
    const url = `/tweets/${id}`;
    return axiosClient.delete(url);
  }

  //Edit Tweet
  static editTweet(param) {
    const url = `/tweets/${param._id}`;
    return axiosClient.patch(url, param);
  }

  //Like Tweet
  static likeTweet(id) {
    const url = `/tweets/${id}/like`;
    return axiosClient.patch(url);
  }
  //UnLike Tweet
  static unlikeTweet(id) {
    const url = `/tweets/${id}/unlike`;
    return axiosClient.patch(url);
  }

  //COUNT COMMENT 
  static countComment(id) {
    const url = `/tweets/${id}/countComment`;
    return axiosClient.get(url);
  }
}
