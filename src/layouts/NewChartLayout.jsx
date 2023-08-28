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
import WebsiteUsersCounter from "../components/WebsiteUsersCounter";
import LeadTimeMetric from "../components/LeadTimeMetric";
import CFR from "../components/ChangeFailureRate";

const NewChartLayout = () => {
  const currRepo = useSelector((state) => state.repo.currRepo);

  return (  
    <div className="w-screen h-full overflow-scroll p-10 pb-24 pr-0">
      <div className="grid grid-cols-9 grid-rows-13 gap-4 pr-4 text-center ">
        <div className="flex col-span-2 h-32 p-2 iflex w-full justify-center items-center bg-gradient-to-br from-teal-300 to-sky-500 hover:from-pink-500 hover:to-yellow-500 rounded-xl font-bold text-white shadow-2xl">
          <Collaborators />
        </div>
        <div className="flex col-span-2 col-start-3 h-32 p-2 iflex w-full justify-center items-center bg-gradient-to-br from-purple-400 to-pink-500 hover:from-pink-500 hover:to-yellow-500 rounded-xl font-bold text-white shadow-2xl">
          <Branches />
        </div>
        <div
          className="col-span-5 row-span-2 col-start-1 row-start-2 text-center items-center rounded-xl shadow-3xl text-white h-full font-bold"
          style={{ backgroundColor: "#171C2Eff" }}
        >
          <div className="pt-6 pb-4">
            <LeadTimeMetric />
            <LeadTimeChart />
          </div>
        </div>
        <div className="flex col-span-2 col-start-5 row-start-1 h-32 p-2 iflex w-full justify-center items-center bg-gradient-to-br from-lime-400 to-green-500 hover:from-pink-500 hover:to-yellow-500 rounded-xl font-bold text-white shadow-2xl">
          <MergeSuccessRate />
        </div>
        <div
          className="col-start-7 row-start-1 rounded-xl shadow-3xl ml-1 h-32 p-2 items-center justify-center font-bold text-white"
          style={{ backgroundColor: "#171C2Eff" }}
        >
          <MergedPRCount />
        </div>
        <div
          className="col-start-8 row-start-1 rounded-xl shadow-3xl ml-1 h-32 p-2 items-center justify-center font-bold text-white"
          style={{ backgroundColor: "#171C2Eff" }}
        >
          <OpenPullRequests />
        </div>
        <div
          className="col-start-7 row-start-2 rounded-xl shadow-3xl ml-1 h-32 p-2 items-center justify-center font-bold text-white"
          style={{ backgroundColor: "#171C2Eff" }}
        >
          <ClosedIssues />
        </div>
        <div
          className="col-start-8 row-start-2 rounded-xl shadow-3xl ml-1 h-32 p-2 items-center justify-center font-bold text-white"
          style={{ backgroundColor: "#171C2Eff" }}
        >
          <NewIssues />
        </div>
        <div
          className="flex row-span-2 col-start-6 row-start-2 rounded-xl shadow-3xl ml-1 h-68 items-center justify-center font-bold text-white bg-gradient-to-br from-yellow-300 to-orange-500 hover:from-pink-500 hover:to-yellow-500 z-10 transition ease-in-out duration-200 hover:w-80 hover:relative hover:right-24 oveflow-scroll"
          style={{
            backgroundColor: "#171C2Eff",
            transition: "ease-in-out 500ms",
          }}
        >
          <Forks />
        </div>
        <div
          className="col-span-2 col-start-7 row-start-3 rounded-xl shadow-3xl ml-1 h-32 p-2 items-center justify-center font-bold text-white bg-gradient-to-br from-rose-400 to-red-700 hover:from-pink-500 hover:to-yellow-500"
          style={{ backgroundColor: "#171C2Eff" }}
        >
          <CommentsPerCodeRatio />
        </div>
        <div
          className="col-span-4 row-span-3 col-start-5 row-start-4 ml-1 h-96 p-2 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white"
          style={{ backgroundColor: "#171C2Eff" }}
        >
          <BarChart fullRepo={currRepo} />
        </div>
        <div
          className="col-span-4 row-span-3 col-start-1 row-start-4 p-2 h-96 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white"
          style={{ backgroundColor: "#171C2Eff" }}
        >
          <IssuesTimeline />
        </div>
        <div
          className="col-start-4 row-start-7 p-2 h-32 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white"
          style={{ backgroundColor: "#171C2Eff" }}
        >
          <NumCommits />
        </div>
        <div
          className="col-start-5 row-start-7 p-2 h-32 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white"
          style={{ backgroundColor: "#171C2Eff" }}
        >
          <NumDeployments />
        </div>
        <div
          className="col-span-3 col-start-1 row-start-7 p-2 h-32 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white bg-gradient-to-br from-emerald-500 to-emerald-800"
          style={{ backgroundColor: "#171C2Eff" }}
        >
          <Stargazers />
        </div>
        <div
          className="col-span-3 col-start-6 row-start-7 p-2 h-32 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white bg-gradient-to-br from-blue-500 to-blue-900"
          style={{ backgroundColor: "#171C2Eff" }}
        >
          <DateCreated />
        </div>
        <div
          className="col-span-4 row-span-3 col-start-1 row-start-8 p-2 h-96 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white"
          style={{ backgroundColor: "#171C2Eff" }}
        >
         <CFR />
        </div>
        <div
          className="col-span-4 row-span-6 col-start-5 row-start-8 p-2 h-192 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white"
          style={{ backgroundColor: "#171C2Eff" }}
        >
          <Activity />
        </div>
        <div
          className="col-span-4 row-span-3 col-start-1 row-start-11 p-2 h-96 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white"
          style={{ backgroundColor: "#171C2Eff" }}
        >
          <MergeSuccessRatePie />
        </div>
        <div className="col-span-8 row-span-1 col-start-1 row-start-12 p-2 h-32 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white bg-gradient-to-br from-indigo-300 to-indigo-500">
          <WebsiteUsersCounter />
        </div>
      </div>
    </div>
  );
};

export default NewChartLayout;
