import React, { useEffect, useState } from "react";
import axios from "axios";

const OpenPullRequests = ({ fullRepo }) => {
  const [openPRs, setOpenPRs] = useState(0);
  const [totalPRs, setTotalPRs] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    async function getOpenPrs() {
      try {
        if (typeof fullRepo !== "string") {
          console.error("fullRepo should be a string");
          return;
        }
        console.log("repoINfo,", fullRepo);
        const repoParts = fullRepo.split("/");
        const username = repoParts[0];
        console.log(username);
        const repo = repoParts[1];

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/pull-requests/merge-success-rate/${username}/${repo}`
        );
        const totalPullReqs = response.data.totalPullRequests;
        setTotalPRs(totalPullReqs);
        const closedReqs = response.data.successfullyMergedPRs;
        const openPR = totalPullReqs - closedReqs;
        setOpenPRs(openPR);
      } catch (error) {
        console.log(error);
      }
    }

    getOpenPrs();
  }, [fullRepo]);

  return (
    <div
    className="flex flex-col justify-center h-full"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    {isHovered ? (
      <>
        <div style={{ color: "lightgreen" }}>Total PRs</div>
        {totalPRs !== null && <div className="text-xl">{totalPRs}</div>}
      </>
    ) : (
      <>
        <div style={{ color: "lightgreen" }}>Open PRs</div>
        {openPRs !== null && <div className="text-xl">{openPRs}</div>}
      </>
    )}
  </div>
  
  );
};

export default OpenPullRequests;
