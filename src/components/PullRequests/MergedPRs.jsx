import React, { useEffect, useState } from "react";
import axios from "axios";

const MergedPRCount = ({ fullRepo }) => {
  const [closedPrs, setClosedPrs] = useState(null);

  useEffect(() => {
    async function mergedPullRequests() {
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
          `http://localhost:8080/api/pull-requests/merge-success-rate/${username}/${repo}`
        );

        setClosedPrs(response.data.successfullyMergedPRs);
      } catch (error) {
        console.log(error);
      }
    }
    mergedPullRequests();
  }, [fullRepo]);

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
