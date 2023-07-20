import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderAPI } from "../../AxiosClient/orderAPI";

//Get All Order
export const getAllOrder = createAsyncThunk("getAllOrder/fetch", async () => {
  const res = await OrderAPI.getAllOrder();
  //   console.log(res.data);
  return res.data;
});

const OrderSlice = createSlice({
  name: "order",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getAllOrder.fulfilled]: (state, action) => {
      return (state = action.payload);
    },
  },
});

const { actions, reducer } = OrderSlice;

export default reducer;
