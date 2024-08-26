import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import axios from "axios";

const NumDeployments = () => {
  const [deployments, setDeployments] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const currRepo = useSelector((state) => state.repo.currRepo);

  useEffect(() => {
    async function getNumDeployments() {
      try {
        if (typeof currRepo !== "string") {
          console.error("currRepo should be a string");
          return;
        }
        // console.log("repoInfo,", currRepo);
        const repoParts = currRepo.split("/");
        const username = repoParts[0];
        // console.log(username);
        const repo = repoParts[1];

        const responseTotal = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/deployments/${username}/${repo}/count/getNum`
        );

        const responseToday = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/deployments/${username}/${repo}/deploymentFrequency/pastDay`
          );

        setDeployments({
            totalNum: responseTotal.data.numDeployments,
            todayNum: responseToday.data.numDeploymentsInRange
        });
      } catch (error) {
        console.log(error);
      }
    }

    getNumDeployments();
  }, [currRepo]);

  return (
    <div
    className="flex flex-col justify-center h-full"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    {isHovered ? (
      <>
        <div style={{ color: "#007FFF" }}>Deploys Today</div>
        {deployments !== null && currRepo !== null 
        ? <div className="text-xl">{deployments.todayNum}</div>
        : <div className="text-xl">N/A</div>
        }
      </>
    ) : (
      <>
        <div style={{ color: "#007FFF" }}>Total Deploys</div>
        {deployments !== null && currRepo !== null 
        ? <div className="text-xl">{deployments.totalNum}</div>
        : <div className="text-xl">N/A</div>
        }
      </>
    )}
  </div>
  
  );
};

export default NumDeployments;