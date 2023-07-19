import axiosClient from "./axiosConfig";

export class FollowAPI {
  //Tạo thêm following
  static makeNewFollow(param) {
    const url = `/follow/following`;
    return axiosClient.post(url, param);
  }

  //Check user follow or not
  static checkFollow(param) {
    const url = `/follow/following/check/${param._id}`;
    return axiosClient.get(url, param);
  }

  //Check user follow or not
  static unFollow(param) {
    const url = `/follow/following/check/${param._id}`;
    return axiosClient.delete(url, param);
  }

  //GET FOLLOWING
  static getFollowing() {
    const url = `/follow/following-me`;
    return axiosClient.get(url);
  }

  //GET FOLLOWER
  static getFollower() {
    const url = `/follow/follower-me`;
    return axiosClient.get(url);
  }

  //GET FOLLOWING BY ID
  static getFollowingById(id) {
    const url = `/follow/following/${id}`;
    return axiosClient.get(url);
  }

  //GET FOLLOWER  BY ID
  static getFollowerById(id) {
    const url = `/follow/follower/${id}`;
    return axiosClient.get(url);
  }
}
