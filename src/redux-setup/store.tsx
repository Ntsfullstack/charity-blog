import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux";

const store = configureStore({
  reducer: {
    auth: authSlice,
    // Other reducers here
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializableCheck if needed
    }),
});

export default store;
