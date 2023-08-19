import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authLogIn = createAsyncThunk(
  "user/authLogIn",
  async (_, { dispatch }) => {
    console.log("hit auth log in redux");
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

const initialState = {
  username: null,
  isLoggedIn: false,
  isAuthenticated: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state,action) => {
      state.username = action.payload
    },
    toggleLoggedIn: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUsername, toggleLoggedIn, setAuthenticated } = userSlice.actions;
export default userSlice.reducer;
