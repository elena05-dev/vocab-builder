import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signup, signin, signout, getCurrentUser } from "../../api/auth";

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  isLoading: false,
  isRefreshing: false,
  error: null,
};

const saveToken = (token) => {
  localStorage.setItem("token", token);
};

const removeToken = () => {
  localStorage.removeItem("token");
};

const authorize = (state, payload) => {
  state.user = {
    email: payload.email,
    name: payload.name,
  };

  state.token = payload.token;

  saveToken(payload.token);
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await signup(data);

      return response;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await signin(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  },
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await signout();
});

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrentUser();
      return response;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Fetching user failed",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        authorize(state, action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        authorize(state, action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;

        removeToken();
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
        };

        state.token = action.payload.token;
        state.isRefreshing = false;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isRefreshing = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
