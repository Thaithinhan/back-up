import axiosClient from "./axiosConfig";

export class NotificationAPI {
  //Lấy Notification theo User đăng nhập
  //GET FOLLOWING
  static getNotifications(receiver) {
    const url = `/notifications/${receiver}`;
    return axiosClient.get(url);
  }
}
