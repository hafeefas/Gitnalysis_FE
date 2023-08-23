import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getUserRepos,
  getForkedRepos,
  getNonForkedRepos,
  getStarredRepos,
} from "../redux/slices/repoSlice";
import { useMediaQuery } from "@mui/material";
import RepoList from "../components/RepoList";
import "../login.css";
import DateRangeToolbar from "../components/DateRangeToolbar";

const Repos = () => {
  const dispatch = useDispatch();
  const isTabletScreen = useMediaQuery("(max-width: 770px)");
  const isMobileScreen = useMediaQuery("(max-width: 420px)");

  useEffect(() => {
    const fetchAllRepos = async () => {
      try {
        await dispatch(getUserRepos());
        await dispatch(getForkedRepos());
        await dispatch(getNonForkedRepos());
        await dispatch(getStarredRepos());
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };
    fetchAllRepos();
  }, [dispatch]);

  return isTabletScreen ? (
    <></>
  ) : isMobileScreen ? (
    <></>
  ) : (
    <div
      className="justify-center items-center bg-gray-200 overflow-scroll"
      style={{ backgroundColor: "#111526ff", height: "40rem" }}
    >
      <div
        className="bg-gray-400 p-6 rounded-lg shadow-md max-w-screen-lg"
        style={{ backgroundColor: "#171C2Eff" }}
      >
        <RepoList />
      </div>
    </div>
  );
};

export default Repos;
