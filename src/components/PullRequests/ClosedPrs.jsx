import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import axios from "axios";

const MergedPRCount = () => {
  const [closedPrs, setClosedPrs] = useState(null);
  const currRepo = useSelector((state) => state.repo.currRepo);

  useEffect(() => {
    async function mergedPullRequests() {
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
          `${process.env.REACT_APP_BACKEND_URL}/api/pull-requests/merge-success-rate/${username}/${repo}`
        );

        setClosedPrs(response.data.successfullyMergedPRs);
      } catch (error) {
        console.log(error);
      }
    }
    mergedPullRequests();
  }, [currRepo]);

  return (
    <div className="flex flex-col justify-center h-full">
      <>
        <div style={{ color: "lightpink" }}>Closed PRs</div>
        {closedPrs !== null && <div className="text-xl">{closedPrs}</div>}
      </>
    </div>
  );
};

export default MergedPRCount;
