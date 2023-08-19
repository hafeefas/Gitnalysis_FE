import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allRepos: [],
  currRepo: null,
  status: "idle",
  error: null,
};

export const getUserRepos = createAsyncThunk("repo/getUserRepos", async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/me/repos`,
      {},
      { withCredentials: true }
    );

    const repoNames = res.data.map((repo) => {
      return { full_name: repo.full_name, name: repo.name };
    });
    return repoNames;
  } catch (error) {
    console.log(error.message);
  }
});

const repoSlice = createSlice({
  name: "repo",
  initialState,
  reducers: {
    setCurrentRepo: (state, action) => {
      state.currRepo = action.payload;
    },
    resetRepos: (state) => {
      state.allRepos = [];
    },
    resetCurrRepo: (state) => {
      state.currRepo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserRepos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserRepos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allRepos = action.payload;
      })
      .addCase(getUserRepos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCurrentRepo, resetRepos, resetCurrRepo } = repoSlice.actions;
export default repoSlice.reducer;
