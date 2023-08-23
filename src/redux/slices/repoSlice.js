import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allRepos: [],
  forkedRepos: [],
  nonForkedRepos: [],
  starredRepos: [],
  ownerRepos: [],
  currRepo: null,
  currRepoOwner: null,
  status: "idle",
  error: null,
};

//get all repos associated with user
export const getUserRepos = createAsyncThunk("repo/getUserRepos", async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/me/repos`,
      {},
      { withCredentials: true }
    );

    const repos = res.data;
    return repos;
  } catch (error) {
    console.log(error.message);
  }
});

//get all starred repos
export const getStarredRepos = createAsyncThunk(
  "repo/getStarredRepos",
  async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/stars/me/starred`,
        {},
        { withCredentials: true }
      );

      const starredRepos = res.data.starredRepos;
      console.log(starredRepos, "starred in redux");
      return starredRepos;
    } catch (error) {
      console.log(error.message);
    }
  }
);

//get all forked repos
export const getForkedRepos = createAsyncThunk(
  "repo/getForkedRepos",
  async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/me/repos`,
        {},
        { withCredentials: true }
      );

      const allRepos = res.data;
      const forkedRepos = allRepos.filter((repo) => repo.fork === true);
      console.log(forkedRepos);
      return forkedRepos;
    } catch (error) {
      console.log(error.message);
    }
  }
);

//get all repos that the user owns - not forked
export const getNonForkedRepos = createAsyncThunk(
  "repo/getNonForkedRepos",
  async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/me/repos`,
        {},
        { withCredentials: true }
      );

      const allRepos = res.data;
      const nonForkedRepos = allRepos.filter((repo) => repo.fork === false);
      console.log(nonForkedRepos);
      return nonForkedRepos;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const repoSlice = createSlice({
  name: "repo",
  initialState,
  reducers: {
    setCurrentRepo: (state, action) => {
      state.currRepo = action.payload;
    },
    setOwnerRepos: (state, action) => {
      state.ownerRepos = action.payload;
    },
    setCurrRepOwner: (state, action) => {
      state.currRepoOwner = action.payload;
    },
    resetRepos: (state) => {
      state.allRepos = [];
      state.forkedRepos = [];
      state.nonForkedRepos = [];
      state.starredRepos = [];
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
      })
      .addCase(getForkedRepos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getForkedRepos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.forkedRepos = action.payload;
      })
      .addCase(getForkedRepos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getNonForkedRepos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNonForkedRepos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.nonForkedRepos = action.payload;
      })
      .addCase(getNonForkedRepos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getStarredRepos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStarredRepos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.starredRepos = action.payload;
      })
      .addCase(getStarredRepos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  setCurrentRepo,
  resetRepos,
  resetCurrRepo,
  setOwnerRepos,
  setCurrRepOwner,
} = repoSlice.actions;
export default repoSlice.reducer;
