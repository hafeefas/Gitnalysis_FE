import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import axios from "axios";

const NumCommits = () => {
  const [numCommitsObject, setNumCommitsObject] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const currRepo = useSelector((state) => state.repo.currRepo);

  useEffect(() => {
    async function getOpenPrs() {
      try {
        if (typeof currRepo !== "string") {
          console.error("currRepo should be a string");
          return;
        }
        console.log("repoInfo,", currRepo);
        const repoParts = currRepo.split("/");
        const username = repoParts[0];
        console.log(username);
        const repo = repoParts[1];

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/commits/count/${username}/${repo}`
        );
        // const  = response.data.totalPullRequests;
        // setTotalPRs(totalPullReqs);
        // const closedReqs = response.data.successfullyMergedPRs;
        // const openPR = totalPullReqs - closedReqs;
        setNumCommitsObject(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getOpenPrs();
  }, [currRepo]);

  return (
    <div
    className="flex flex-col justify-center h-full"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    {isHovered ? (
      <>
        <div style={{ color: "lightgreen" }}>Past 24h Commits</div>
        {numCommitsObject !== null && currRepo !== null 
        ? <div className="text-xl">{numCommitsObject.todaysCommits}</div>
        : <div className="text-xl">N/A</div>
        }
      </>
    ) : (
      <>
        <div style={{ color: "lightgreen" }}>Total Commits</div>
        {numCommitsObject !== null && currRepo !== null 
        ? <div className="text-xl">{numCommitsObject.commits}</div>
        : <div className="text-xl">N/A</div>
        }
      </>
    )}
  </div>
  
  );
};

export default NumCommits;