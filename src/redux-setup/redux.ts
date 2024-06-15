import { createSlice } from "@reduxjs/toolkit";
import Banner from "../components/banner/Banner";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    BannerImages: [
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
    ],
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;

      state.user = null;
      localStorage.clear();
    },
    setBannerImages: (state, action) => {
      state.BannerImages = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  setBannerImages,
} = authSlice.actions;
export default authSlice.reducer;
