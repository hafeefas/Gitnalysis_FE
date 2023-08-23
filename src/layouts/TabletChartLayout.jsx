import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DateRangeToolbar from "../components/DateRangeToolbar";
import LeadTimeChart from ".././components/LeadTimeChart";
import Branches from ".././components/Branches";
import Collaborators from "../components/Collaborators";
import MergeSuccessRate from "../components/MergeSuccessRate";
import BarChart from "../components/CommitsBarChart";
import MergedPRCount from "../components/PullRequests/ClosedPrs";
import OpenPullRequests from "../components/PullRequests/OpenPRs";
import ClosedIssues from "../components/Issues/ClosedIssues";
import NewIssues from "../components/Issues/NewIssues";
import Forks from "../components/Forks";
import CommentsPerCodeRatio from "../components/CommentsPerCodeRatio";
import Stargazers from "../components/Stargazers";
import NumCommits from "../components/NumCommits";
import DateCreated from "../components/DateCreated";
import NumDeployments from "../components/NumDeployments";
import Activity from "../components/Activity";
import IssuesTimeline from "../components/IssuesTimeline";
import MergeSuccessRatePie from "../components/MergeSuccessRatePie";
import { getRepoMetrics } from "../services/getRepoMetrics";
import { useMediaQuery } from "@mui/material";

const TabletChartLayout = ({ username, currRepo }) => {
  const [repoInfo, setRepoInfo] = useState(null);
  const isMobileScreen = useMediaQuery("(max-width: 420px)");

  useEffect(() => {
    async function fetchRepoMetrics() {
      try {
        const splitCurrRepo = currRepo.split("/");
        // console.log(splitCurrRepo);
        const username = splitCurrRepo[0];
        const repo = splitCurrRepo[1];
        const metrics = await getRepoMetrics(username, repo);
        setRepoInfo(metrics);
        // console.log(metrics);
      } catch (error) {
        console.error("Error fetching repository metrics:", error);
      }
    }

    fetchRepoMetrics();
  }, [currRepo]);

  //   console.log("Rendering NewChartLayout");

  return (
    // <div
    //   className={`w-full h-screen overflow-y-auto pt-28 ${
    //     isMobileScreen ? "ml-2" : "ml-8"
    //   }`}
    // >
    //   <div className="grid gap-y-12">
    //     <div className="grid-rows-7 grid grid-cols-4 gap-4 mx-10 text-center text-white">
    //       <div
    //         className="col-span-2 bg-slate-300 p-4 rounded-xl shadow-3xl h-32 flex p-2 items-center justify-center "
    //         style={{ backgroundColor: "#171C2Eff" }}
    //       >
    //         Collaborators
    //       </div>
    //       <div
    //         className="col-span-2 bg-slate-300 p-4 rounded-xl shadow-3xl h-32 flex p-2 items-center justify-center"
    //         style={{ backgroundColor: "#171C2Eff" }}
    //       >
    //         <Branches />
    //       </div>
    //       <div
    //         className="col-span-4 bg-slate-300 p-4 rounded-xl shadow-3xl flex p-2 items-center justify-center h-60 "
    //         style={{ backgroundColor: "#171C2Eff" }}
    //       >
    //         Issues
    //       </div>
    //       <div
    //         className="col-span-2 bg-slate-300 p-4 rounded-xl shadow-3xl flex h-28 p-2 items-center justify-center"
    //         style={{ backgroundColor: "#171C2Eff" }}
    //       >
    //         Open PRs
    //       </div>
    //       <div
    //         className="col-span-2 bg-slate-300 p-4 rounded-xl shadow-3xl flex h-28 p-2 items-center justify-center"
    //         style={{ backgroundColor: "#171C2Eff" }}
    //       >
    //         Merged PRs
    //       </div>
    //       <div
    //         className="col-span-2 bg-slate-300 p-4 rounded-xl shadow-3xl flex h-28 p-2 items-center justify-center"
    //         style={{ backgroundColor: "#171C2Eff" }}
    //       >
    //         Open Issues
    //       </div>
    //       <div
    //         className="col-span-2 bg-slate-300 p-4 rounded-xl shadow-3xl flex h-28 p-2 items-center justify-center"
    //         style={{ backgroundColor: "#171C2Eff" }}
    //       >
    //         Closed Issues
    //       </div>
    //       <div
    //         className="col-span-4 bg-slate-300 p-4 rounded-xl shadow-3xl flex p-2 items-center justify-center h-56"
    //         style={{ backgroundColor: "#171C2Eff" }}
    //       >
    //         <LeadTimeChart repoInfo={repoInfo} />
    //       </div>
    //       <div
    //         className="col-span-4 bg-slate-300 p-4 rounded-xl shadow-3xl flex p-2 items-center justify-center h-96"
    //         style={{ backgroundColor: "#171C2Eff" }}
    //       >
    //         Commits with Collaborators
    //       </div>
    //       <div
    //         className="col-span-4 bg-slate-300 h-32 p-4 rounded-xl shadow-3xl flex p-2 items-center justify-center"
    //         style={{ backgroundColor: "#171C2Eff" }}
    //       >
    //         Merged Success Rate
    //       </div>
    //       <div
    //         className="col-span-4 bg-slate-300 h-60 p-4 rounded-xl shadow-3xl flex p-2 items-center justify-center"
    //         style={{ backgroundColor: "#171C2Eff" }}
    //       >
    //         Change Failure Rate
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="w-screen h-full overflow-scroll p-20 pb-24 pt-24 pr-0">
      <div className="grid grid-cols-4 grid-rows-26 gap-4 pr-4 text-center ">
        <div className="flex col-span-2 h-32 p-2 iflex w-full justify-center items-center bg-gradient-to-br from-teal-300 to-sky-500 hover:from-pink-500 hover:to-yellow-500 rounded-xl font-bold text-white shadow-2xl">
          <Collaborators />
        </div>
        <div className="flex col-span-2 col-start-3 h-32 p-2 iflex w-full justify-center items-center bg-gradient-to-br from-purple-400 to-pink-500 hover:from-pink-500 hover:to-yellow-500 rounded-xl font-bold text-white shadow-2xl">
          <Branches />
      </div>
      <div
        className="col-span-4 row-span-2 col-start-1 row-start-2 text-center items-center rounded-xl shadow-3xl text-white h-full font-bold"
        style={{ backgroundColor: "#171C2Eff" }}
      >
        Lead Time for Change
        <LeadTimeChart />
      </div>
      <div className="flex col-span-2 col-start-1 row-start-4 h-32 p-2 iflex w-full justify-center items-center bg-gradient-to-br from-lime-400 to-green-500 hover:from-pink-500 hover:to-yellow-500 rounded-xl font-bold text-white shadow-2xl">
        <MergeSuccessRate />
      </div>
      <div
        className="col-start-3 row-start-4 rounded-xl shadow-3xl ml-1 h-32 p-2 items-center justify-center font-bold text-white"
        style={{ backgroundColor: "#171C2Eff" }}
      >
        <MergedPRCount />
      </div>
      <div
        className="col-start-4 row-start-4 rounded-xl shadow-3xl ml-1 h-32 p-2 items-center justify-center font-bold text-white"
        style={{ backgroundColor: "#171C2Eff" }}
      >
        <OpenPullRequests />
      </div>
      <div
        className="col-start-3 row-start-5 rounded-xl shadow-3xl ml-1 h-32 p-2 items-center justify-center font-bold text-white"
        style={{ backgroundColor: "#171C2Eff" }}
      >
        <ClosedIssues />
      </div>
      <div
        className="col-start-4 row-start-5 rounded-xl shadow-3xl ml-1 h-32 p-2 items-center justify-center font-bold text-white"
        style={{ backgroundColor: "#171C2Eff" }}
      >
        <NewIssues />
      </div>
      <div
        className="col-span-2 col-start-1 row-start-5 rounded-xl shadow-3xl ml-1 h-32 p-2 items-center justify-center font-bold text-white bg-gradient-to-br from-rose-400 to-red-700 hover:from-pink-500 hover:to-yellow-500"
        style={{ backgroundColor: "#171C2Eff" }}
      >
        <CommentsPerCodeRatio />
      </div>
      <div
        className="col-span-4 row-span-3 col-start-1 row-start-6 p-2 h-96 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white"
        style={{ backgroundColor: "#171C2Eff" }}
      >
        <IssuesTimeline />
      </div>
      <div
        className="col-span-4 row-span-3 col-start-1 row-start-9 ml-1 h-96 p-2 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white"
        style={{ backgroundColor: "#171C2Eff" }}
      >
        <BarChart fullRepo={currRepo} />
      </div>
      <div
        className="flex row-span-2 col-start-1 row-start-12 rounded-xl shadow-3xl ml-1 h-64 items-center justify-center font-bold text-white bg-gradient-to-br from-yellow-300 to-orange-500 hover:from-pink-500 hover:to-yellow-500 z-10 transition ease-in-out duration-200 hover:w-80 hover:relative hover:right-24 oveflow-scroll"
        style={{
          backgroundColor: "#171C2Eff",
          transition: "ease-in-out 500ms",
        }}
      >
        <Forks />
      </div>
      <div
        className="col-span-3 col-start-2 row-start-12 p-2 h-32 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white bg-gradient-to-br from-emerald-500 to-emerald-800"
        style={{ backgroundColor: "#171C2Eff" }}
      >
        <Stargazers />
      </div>
      <div
        className="col-span-3 col-start-2 row-start-13 p-2 h-32 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white bg-gradient-to-br from-blue-500 to-blue-900"
        style={{ backgroundColor: "#171C2Eff" }}
      >
        <DateCreated />
      </div>
      <div
        className="col-span-4 row-span-3 col-start-1 row-start-14 p-2 h-96 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white"
        style={{ backgroundColor: "#171C2Eff" }}
      >
        Change Failure Rate (CFR)
      </div>
      <div
        className="col-span-4 row-span-6 col-start-1 row-start-17 p-2 h-192 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white"
        style={{ backgroundColor: "#171C2Eff" }}
      >
        <Activity />
      </div>
      <div
        className="col-span-4 row-span-3 col-start-1 row-start-23 p-2 h-96 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white"
        style={{ backgroundColor: "#171C2Eff" }}
      >
        <MergeSuccessRatePie />
      </div>
      <div
        className="col-start-2 row-start-26 p-2 h-32 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white"
        style={{ backgroundColor: "#171C2Eff" }}
      >
        <NumCommits />
      </div>
      <div
        className="col-start-3 row-start-26 p-2 h-32 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white"
        style={{ backgroundColor: "#171C2Eff" }}
      >
        <NumDeployments />
      </div>
    </div>
  </div>
  );
};

export default TabletChartLayout;
