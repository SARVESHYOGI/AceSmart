import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import {type User } from "../types/User";
import { getCurrentUser, loginUser } from "../api/auth";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  return await getCurrentUser();
});

export const login = createAsyncThunk("auth/login", async (credentials: { email: string; password: string }) => {
  return await loginUser(credentials.email, credentials.password);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
