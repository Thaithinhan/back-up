import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentAPI from "../../axiosClient/commentAPI";

export const createComment = createAsyncThunk(
  "createComment",
  async (param) => {
    const res = await commentAPI.createComment(param);
    const data = await res.data;
    return data;
  }
);
export const getCommentByTweetId = createAsyncThunk(
  "getComment",
  async (id) => {
    const res = await commentAPI.getCommentByTweet(id);
    const data = await res.data;
    //     console.log(data);
    return data.comments;
  }
);

const CommentSlice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {},
  extraReducers: {
    [createComment.fulfilled]: (state, action) => {
      state.push(action.payload);
    },

    [getCommentByTweetId.fulfilled]: (state, action) => {
      return state;
    },
  },
});

const { actions, reducer } = CommentSlice;

export default reducer;
