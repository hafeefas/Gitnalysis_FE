import React, { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";

const CustomTooltip = ({ id, value, indexValue }) => (
  <div
    style={{ padding: "12px", color: "#fff", background: "rgba(0, 0, 0, 0.7)" }}
  >
    <strong>{indexValue}</strong>
    <br />
    Commits: {value}
  </div>
);

const BarChart = ({ fullRepo }) => {
  const [commitsData, setCommitsData] = useState([]);
  const [commitCount, setCommitCount] = useState(undefined)
  const [timeRange, setTimeRange] = useState("pastWeek");

  useEffect(() => {
    async function getCommits() {
      try {
        if (typeof fullRepo !== "string") {
          console.error("fullRepo should be a string");
          return;
        }
        // console.log("repoINfo,", fullRepo);
        const repoParts = fullRepo.split("/");
        const username = repoParts[0];
        // console.log(username);
        const repo = repoParts[1];
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/commits/timeline/${username}/${repo}/${timeRange}`,
          { withCredentials: true }
        );
        // const response = await axios.get(`http://localhost:8080/api/commits/timeline/${username}/${repo}`,{withCredentials:true});
        // console.log(response.data);
        const dataArray = Object.entries(response.data).map(
          ([date, commits]) => ({ date, commits })
        );
        // console.log(dataArray);
        setCommitsData(dataArray);

        const commits = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/commits/count/${username}/${repo}`
        );

        setCommitCount(commits.data.commits)
      } catch (error) {
        console.log(error);
      }
    }

    getCommits();
  }, [fullRepo, timeRange]);

  return (
    <div style={{ height: "35vh", width: "100%" }}>
     <div>
    <span style={{ color: "lightblue" }}>Total Commits: </span> 
    {commitCount}
  </div>
      <div className="flex gap-8 items-center justify-center">
        <div>Commits Timeline</div>
        <FormControl variant="outlined" style={{ marginBottom: "20px" }}>
          {/* <InputLabel id="timeRange-label">Time Range</InputLabel> */}
          <Select
            className="bg-gradient-to-r from-cyan-500 to-blue-500"
            labelId="timeRange-label"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            label="Time Range"
            style={{
              color: "white",
              borderRadius: "1rem",
              boxShadow: "1px 1px 1px white",
              position: "relative",
              top: "10px",
            }}
          >
            <MenuItem value="pastDay">Past Day</MenuItem>
            <MenuItem value="pastWeek">Past Week</MenuItem>
            <MenuItem value="pastMonth">Past Month</MenuItem>
            <MenuItem value="pastYear">Past Year</MenuItem>
          </Select>
        </FormControl>
      </div>
      <ResponsiveBar
        data={commitsData}
        isInteractive={true}
        enableLabel={false}
        tooltip={CustomTooltip}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: "white",
                fontSize: 10,
              },
            },
            legend: {
              text: {
                fill: "white",
              },
            },
          },
          grid: {
            line: {
              stroke: "white",
            },
          },
          labels: {
            text: {
              fill: "darkblue",
            },
          },
        }}
        keys={["commits"]}
        indexBy="date"
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        colors={"#22E0E3ff"}
        borderColor={{ from: "color", modifiers: [["darker", "1.6"]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45, // slant the dates for better legibility
          // legend: 'Date',
          // legendPosition: 'middle',
          // legendOffset: 20,
          format: (d) => d, // this ensures the date is displayed as is
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Commit Counts",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", "1.6"]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
          },
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default BarChart;
