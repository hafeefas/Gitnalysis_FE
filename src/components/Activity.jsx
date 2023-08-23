import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ResponsiveLine } from '@nivo/line'
import { Select, MenuItem, FormControl } from "@material-ui/core";

const Activity = () => {
  const [activity, setActivity] = useState(null);
  const [chartData, setChartData] = useState(null);
  const currRepo = useSelector((state) => state.repo.currRepo);
  const [timeRange, setTimeRange] = useState("week");

  useEffect(() => {
    async function getActivity() {
      try {
        if (typeof currRepo !== "string") {
          console.error("currRepo should be a string");
          return;
        }
        const repoParts = currRepo.split("/");
        const username = repoParts[0];
        const repo = repoParts[1];

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/repos/${username}/${repo}/getActivity/${timeRange}`
        );

        setActivity(response.data.repoActivityArray);

        const rawChartData = response.data.activitiesTimelineChartObject;
        if(rawChartData){
          console.log(rawChartData + JSON.stringify(rawChartData))
          const fixedChartData = [{
            "id": "Activity Count",
            "color": "hsl(68, 70%, 50%)",
            "data" : [],
          }
        ]
          for(const dateKey in rawChartData){
            fixedChartData[0].data.unshift({
              x : dateKey.split(" ")[0] === "0"? "this past " + dateKey.split(" ")[1].substring(0, dateKey.split(" ")[1].length-1) : dateKey,
              y: rawChartData[dateKey]
            })
          }
          console.log("fixed chart" + JSON.stringify(fixedChartData));
          setChartData(fixedChartData);
        }

      } catch (error) {
        console.log(error);
      }
    }
    getActivity();
  }, [currRepo, timeRange]);

  return (
    <div className="flex flex-col h-full">
      <div className="h-96">
        <div className="mb-4 text-xl text-rose-300">Activity Monitor</div>
        <div className="h-80 overflow-scroll shadow-2xl">
        <>
          {activity !== null && currRepo !== null 
          ? activity.map(oneActivity => 
            (<div className="flex flex-col gap-8 mt-4 mb-4">
              <div className="flex flex w-full">
              <img className="rounded-full mr-2" src={oneActivity.userAvatar} alt="user-avatar" width="30px" height="30px"/>
              <div className="text-l">{oneActivity.userName + " made a " + oneActivity.activityType + " " + oneActivity.timeAgo}</div>
              </div>
            </div>  
          )
          )
          : <div className="text-xl">N/A</div>
          }
        </>
        </div>
      </div>

      <div className="flex flex-col h-96">
      <FormControl variant="outlined" style={{ marginBottom: '20px' }}>
        {/* <InputLabel id="timeRange-label">Time Range</InputLabel> */}
        <Select
          labelId="timeRange-label"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        //   label="Time Range"
          style={{ color: "white", backgroundColor: "#007FFF", borderRadius: "1rem", boxShadow: "1px 1px 1px white", position: "relative", top:"10px", width: "150px", margin: "0 auto"}} 
        >
          {/* <MenuItem value="pastDay" >Past Day</MenuItem> */}
          <MenuItem value="week" >Past Week</MenuItem>
          <MenuItem value="month" >Past Month</MenuItem>
          <MenuItem value="year" >Past Year</MenuItem>
        </Select>
      </FormControl>  
      <>
        {/* <div style={{ color: "#007FFF" }}>Issues Timeline</div> */}
        {activity !== null && currRepo !== null 
        ?  <ResponsiveLine
            data={chartData}
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
            margin={{ top: 50, right: 50, bottom: 60, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
            // groupMode="grouped"
            colors={"#22E0E3ff"}
            borderColor={{ from: "color", modifiers: [["darker", "1.6"]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -45,
              // legend: 'Date',
              legendOffset: 36,
              legendPosition: 'middle'
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Activities',
              legendOffset: -40,
              legendPosition: 'middle',
            }}
            enablePoints={false}
            // colors={{ scheme: 'nivo' }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            enableGridX={false}
            enableGridY={false}
            curve="natural"
            enableSlices="x"
            sliceTooltip={({ slice }) => (
              <div>
                <strong>{slice.points[0].data.x}</strong>
                {slice.points.map(point => (
                  <div key={point.id}>
                    {point.serieId}: {point.data.yFormatted}
                  </div>
                ))}
              </div>
            )}
          />
        : <div className="text-xl">N/A</div>
        }
      </>
      </div>
    </div>
  );
};

export default Activity;