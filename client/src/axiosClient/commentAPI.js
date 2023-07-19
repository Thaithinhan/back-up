import axios from "axios";
import axiosClient from "./axiosConfig";
class CommentAPI {
  //Create comment for current user
  static createComment(param) {
    const url = "/comments";
    return axiosClient.post(url, param);
  }

  //Get all COmment of a tweet by tweet id
  static getCommentByTweet(id) {
    const url = `/comments/${id}/all-comment`;
    return axiosClient.get(url);
  }
}

export default CommentAPI;
