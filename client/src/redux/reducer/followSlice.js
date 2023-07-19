import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FollowAPI } from "../../axiosClient/followAPI";

//MAKE FOLLOWING
export const makeFollowing = createAsyncThunk("following", async (param) => {
  const response = await FollowAPI.makeNewFollow(param);
  // console.log(response.data);

  return response.data;
});

//CHECK FOLLOWING
export const checkFollow = createAsyncThunk(
  "check/following",
  async (param) => {
    const response = await FollowAPI.checkFollow(param);
    // console.log(response.data);

    return response.data;
  }
);

//UNFOLLOWING
export const unFollow = createAsyncThunk("unfollowing", async (param) => {
  const response = await FollowAPI.unFollow(param);
  console.log(response.data);
  return response.data;
});

//GET FOLLOWING
export const getFollowing = createAsyncThunk("get/following", async () => {
  const response = await FollowAPI.getFollowing();
  //   console.log(response.data);
  return response.data;
});

//GET FOLLOWER
export const getFollower = createAsyncThunk("get/follower", async () => {
  const response = await FollowAPI.getFollower();
  //   console.log(response.data);
  return response.data;
});
//GET FOLLOWING BY ID USER
export const getFollowingById = createAsyncThunk(
  "get/following",
  async (id) => {
    const response = await FollowAPI.getFollowingById(id);
    // console.log(response.data);
    return response.data;
  }
);

//GET FOLLOWER BY ID
export const getFollowerById = createAsyncThunk("get/follower", async (id) => {
  const response = await FollowAPI.getFollowerById(id);
  //   console.log(response.data);
  return response.data;
});

const FollowSlice = createSlice({
  name: "follow",
  initialState: JSON.parse(localStorage.getItem("login-user")) || {},
  reducers: {},
  extraReducers: {
    [makeFollowing.fulfilled]: (state, action) => {
      return state;
    },
    [checkFollow.fulfilled]: (state, action) => {
      return state; //
    },
    [unFollow.fulfilled]: (state, action) => {
      return state;
    },
    [getFollowing.fulfilled]: (state, action) => {
      return state;
    },
    [getFollower.fulfilled]: (state, action) => {
      return state;
    },
  },
});

const { actions, reducer } = FollowSlice;

export default reducer;
