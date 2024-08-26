import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import { Tooltip } from "@mui/material";

const CFR = () => {
  const [cfr, setCfr] = useState(0);
  const currRepo = useSelector((state) => state.repo.currRepo);

  useEffect(() => {
    async function getCFR() {
      try {
        if (typeof currRepo !== "string") {
          console.error("currRepo should be a string");
          return;
        }
        const repoParts = currRepo.split("/");
        const username = repoParts[0];
        const repo = repoParts[1];

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/deployments/${username}/${repo}/cfr`,
          { withCredentials: true }
        );
        // console.log("cfr", response.data);
        setCfr(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCFR();
  }, [currRepo]);
  if (cfr === null) return <div>Loading...</div>;

  const data = [
    {
      id: "CFR",
      label: "Change Failure Rate",
      value: cfr,
    },
    {
      id: "Success",
      label: "Sucessful Deployments",
      value: 100 - cfr,
    },
  ];

  return (
    <div className="flex justify-center items-center">
      <div style={{ height: 400, width: 400 }}>
        <Tooltip
          title="The Change Failure Rate (CFR) is the percentage of deployments that result in failure. A common guideline is to aim for a CFR below 15% to ensure a stable and reliable software release process."
          arrow
          placement="top"
        >
          <div className="flex justify-center items-center">
            Change Failure Rate
          </div>
        </Tooltip>
        <ResponsivePie
          data={data}
          isInteractive={false}
          margin={{ top: 0, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          colors={["#fec7d7", "#fffffe"]}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="white"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          radialLabel="id"
          radialLabelsTextColor="white"
        />
      </div>
    </div>
  );
};

export default CFR;
