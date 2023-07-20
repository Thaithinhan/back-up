import baseAxios from "./axiosClient";

export class OrderAPI {
  //get All Order
  static getAllOrder() {
    const url = "/orders";
    return baseAxios.get(url);
  }
}
