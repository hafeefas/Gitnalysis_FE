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
import gitnalsyisBackground from "../assets/gitnalysis_coder.png";

const ReposHome = () => {
  return (
    <div
      className="flex w-full bg-gray-200 overflow-scroll text-white h-5/6 mt-12"
      style={{ backgroundColor: "#111526ff" }}
    >
      <div
        className="grid w-3/4 grid-cols-2 grid-rows-0 row-span-8 ml-8 text-center"
        style={{ backgroundColor: "red" }}
      >
        <div
          className="flex row-span-1 col-span-2 border-2 border-white justify-center items-end pb-8 text-5xl"
          style={{ fontFamily: `'Domine', serif` }}
        >
          gitnalysis
        </div>
        <div
          className="flex col-start-1 col-span-2 break-words  font-bold justify-center"
          style={{
            backgroundColor: "green",
            fontFamily: `"Montserrat", sans-erif`,
          }}
        >
          {/* Discover insights and metrics of your favorite GitHub repositories */}
          Discover insights and metrics of your favorite GitHub repositories
        </div>
        <div className="grid grid-cols-2 col-span-2 row-span-1">
          <div
            className="flex col-start-1 row-span-1"
            style={{ backgroundColor: "gray" }}
          >
            <div className="col-start-1 col-end-3 row-span-1"></div>
            <div className="row-span-1"></div>
            <div className="row-span-1"></div>
            <div className="row-span-1"></div>
            {/* <div>ReposHome3</div>
        <div>ReposHome4</div>
        <div>ReposHome5</div>
        <div>ReposHome6</div>
        <div>ReposHome7</div>
        <div>ReposHome8</div>
        <div>ReposHome9</div>
        <div>ReposHome10</div> */}
          </div>
        </div>
      </div>
      <div
        className="flex justify-center items-center"
        style={{ backgroundColor: "purple" }}
      >
        <img src={gitnalsyisBackground} />
      </div>
    </div>
  );
};

export default ReposHome;
