// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios"; // Assuming backend API calls

// const initialState = {
//   user: null,
//   isLoading: false,
//   error: null,
// };

// export const login = createAsyncThunk(
//   "user/login",
//   async (credentials: any, { rejectWithValue }: any) => {
//     try {
//       const response = await axios.post("/api/login", credentials);
//       return response.data; // Assuming response contains user data
//     } catch (error) {
//       return rejectWithValue(error.response.data.message || "Login failed");
//     }
//   }
// );

// export const logout = createAsyncThunk("user/logout", async () => {
//   try {
//     await axios.post("/api/logout"); // Assuming backend logout call
//   } catch (error) {
//     console.error("Logout error:", error); // Handle logout errors gracefully
//   }
// });

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       .addCase(logout.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(logout.fulfilled, (state) => {
//         state.isLoading = false;
//         state.user = null;
//       })
//       .addCase(logout.rejected, (state) => {
//         state.isLoading = false;
//         // Handle logout errors gracefully (optional)
//       });
//   },
// });

// export default userSlice.reducer;
