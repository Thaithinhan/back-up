import baseAxios from "./axiosClient";

export class UserAPI {
  //Login
  static login(param) {
    const url = "/users/login";
    return baseAxios.post(url, param);
  }

  //get user not Admin
  static getAllUsersNotAdmin() {
    const url = "/users/notadmin";
    return baseAxios.get(url);
  }
}
