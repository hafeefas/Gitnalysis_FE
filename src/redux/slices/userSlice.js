import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authLogIn = createAsyncThunk(
  "user/authLogIn",
  async (_, { dispatch }) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/me`,
        {},
        { withCredentials: true }
      );
      dispatch(toggleLoggedIn());
    } catch (error) {
      console.error("Error fetching authenticating user");
    }
  }
);

export const getLoggedInUser = createAsyncThunk(
  "user/loggedInUser",
  async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/me`,
        {},
        { withCredentials: true }
      );
      const userData = res.data;
      console.log(userData, "USER DATA REDUX");
      return userData;
    } catch (error) {
      console.error("Error fetching authenticating user");
    }
  }
);

const initialState = {
  username: null,
  loggedInUser: [],
  isLoggedIn: false,
  isAuthenticated: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    toggleLoggedIn: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoggedInUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLoggedInUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loggedInUser = action.payload;
      })
      .addCase(getLoggedInUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setUsername, toggleLoggedIn, setAuthenticated } =
  userSlice.actions;
export default userSlice.reducer;
