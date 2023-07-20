import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserAPI } from "../../AxiosClient/userAPI";

//Login
export const login = createAsyncThunk("login/fetch", async (param) => {
  const res = await UserAPI.login(param);
  //   console.log(res.data);
  return res.data;
});

//Get All User Not Admin 
export const getAllUsersNotAdmin = createAsyncThunk(
  "getUser/fetch",
  async () => {
    const res = await UserAPI.getAllUsersNotAdmin();
    //     console.log(res.data);
    return res.data;
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      return state;
    },
    [getAllUsersNotAdmin.fulfilled]: (state, action) => {
      return (state = action.payload);
    },
  },
});

const { actions, reducer } = UserSlice;

export default reducer;
