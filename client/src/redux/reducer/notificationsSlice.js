import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NotificationAPI } from "../../axiosClient/notificationAPI";

export const getNotificationsByUserLogin = createAsyncThunk(
  "getNotifications",
  async (receiver) => {
    const res = await NotificationAPI.getNotifications(receiver);
    const data = await res.data;
    console.log(data);
    return data;
  }
);

const CommentSlice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getNotificationsByUserLogin.fulfilled]: (state, action) => {
      return state;
    },
  },
});

const { actions, reducer } = CommentSlice;

export default reducer;
