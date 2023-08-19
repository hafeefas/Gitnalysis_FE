import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const ClosedIssues = () => {
  const [closedIssues, setClosedIssues] = useState(0);
  const currRepo = useSelector((state) => state.repo.currRepo);

  useEffect(() => {
    async function getClosedIssues() {
      try {
        if (typeof currRepo !== "string") {
          console.error("currRepo should be a string");
          return;
        }
        const repoParts = currRepo.split("/");
        const username = repoParts[0];
        const repo = repoParts[1];

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/issues/${username}/${repo}/count/getNum`
        );

        console.log(response.data);

        setClosedIssues(response.data.issues.numClosed);
      } catch (error) {
        console.log(error);
      }
    }
    getClosedIssues();
  }, [currRepo]);

  return (
    <div className="flex flex-col justify-center h-full">
      <>
        <div style={{ color: "#007FFF" }}>Closed Issues</div>
        {closedIssues !== null && <div className="text-xl">{closedIssues}</div>}
      </>
    </div>
  );
};

export default ClosedIssues;
