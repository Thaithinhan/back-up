import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TweetAPI } from "../../axiosClient/tweetAPI";

//Lấy các bài đăng của User dăng nhập
export const getTweetForMe = createAsyncThunk("getTweet/fetch", async () => {
  const res = await TweetAPI.getTweetForCurrentUser();
  //   console.log(res.data);
  return res.data;
});

//Xoá bài đăng của User đang đăng nhập
export const deleteTweet = createAsyncThunk("deleteTweet/fetch", async (id) => {
  const res = await TweetAPI.deleteTweet(id);
  console.log(res.data);
  return res.data;
});

//Xoá bài đăng của User đang đăng nhập
export const editTweet = createAsyncThunk("editTweet/fetch", async (param) => {
  const res = await TweetAPI.editTweet(param);
  // console.log(res.data);
  return res.data;
});

//Like bài tweet :
export const likeTweet = createAsyncThunk("likeTweet/fetch", async (id) => {
  const res = await TweetAPI.likeTweet(id);
  // console.log("Like", res.data);
  return res.data;
});

//UnLike bài tweet :
export const unlikeTweet = createAsyncThunk("unlikeTweet/fetch", async (id) => {
  const res = await TweetAPI.unlikeTweet(id);
  // console.log("Unlike", res.data);
  return res.data;
});

//COunt Comment bài tweet :
export const countCommentTweet = createAsyncThunk(
  "countCommentTweet/fetch",
  async (id) => {
    const res = await TweetAPI.countComment(id);
    // console.log("commentCount", res.data.commentCount);
    return res.data.commentCount;
  }
);

const TweetSlice = createSlice({
  name: "tweets",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getTweetForMe.fulfilled]: (state, action) => {
      return (state = action.payload);
    },

    [deleteTweet.fulfilled]: (state, action) => {
      return state;
    },

    [editTweet.fulfilled]: (state, action) => {
      return state;
    },
    [likeTweet.fulfilled]: (state, action) => {
      return state;
    },
    [unlikeTweet.fulfilled]: (state, action) => {
      return state;
    },
    [countCommentTweet.fulfilled]: (state, action) => {
      return state;
    },
  },
});

const { actions, reducer } = TweetSlice;

export default reducer;
