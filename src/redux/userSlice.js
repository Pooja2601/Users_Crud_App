import { createSlice } from "@reduxjs/toolkit";

// store for logged in users
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    userList: [],
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
