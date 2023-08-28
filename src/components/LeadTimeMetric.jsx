import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import axios from "axios";

const LeadTimeMetric = () => {
  const [leadTime, setLeadTime] = useState(null);
  const currRepo = useSelector((state) => state.repo.currRepo);

  useEffect(() => {
    async function fetchLeadTime() {
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
          `${process.env.REACT_APP_BACKEND_URL}/api/lead_time/${username}/${repo}`
        );
        setLeadTime(response.data.average_lead_time);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLeadTime();
  }, [currRepo]);

  return (
    <div className="flex flex-col justify-center h-full">
      <>
        <div style={{ color: "lightpink" }}>The Average Lead Time for Change</div>
        {leadTime !== null && <div className="text-xl">{leadTime}</div>}
      </>
    </div>
  );
};

export default LeadTimeMetric;
