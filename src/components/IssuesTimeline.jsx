import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BsActivity } from "react-icons/bs";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from '@nivo/line';
import { Select, MenuItem, FormControl, InputLabel, OutlinedInput} from "@material-ui/core";

const IssuesTimeline= () => {
  const [chartData, setChartData] = useState(null);
  const currRepo = useSelector((state) => state.repo.currRepo);
  const [timeRange, setTimeRange] = useState("pastWeek")

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
          `${process.env.REACT_APP_BACKEND_URL}/api/issues/${username}/${repo}/timeline/${timeRange}`
        );

        const rawChartData = response.data;
        if(rawChartData){
          const fixedChartData = [{
            "id": "Open",
            "color": "hsl(68, 70%, 50%)",
            "data" : [],
          },
          {
            "id": "Closed",
            "color": "hsl(68, 70%, 50%)",
            "data" : [],
          },
          {
            "id": "All",
            "color": "hsl(68, 70%, 50%)",
            "data" : [],
          },
        ]
          for(const dateKey in rawChartData){
            fixedChartData[0].data.unshift({
              x : dateKey.split(" ")[0] === "0"? "this past " + dateKey.split(" ")[1].substring(0, dateKey.split(" ")[1].length-1) : dateKey,
              y: rawChartData[dateKey].open
            })
          }
          for(const dateKey in rawChartData){
            fixedChartData[1].data.unshift({
              x : dateKey.split(" ")[0] === "0"? "this past " + dateKey.split(" ")[1].substring(0, dateKey.split(" ")[1].length-1) : dateKey,
              y: rawChartData[dateKey].closed
            })
          }
          for(const dateKey in rawChartData){
            fixedChartData[2].data.unshift({
              x : dateKey.split(" ")[0] === "0"? "this past " + dateKey.split(" ")[1].substring(0, dateKey.split(" ")[1].length-1) : dateKey,
              y: rawChartData[dateKey].all
            })
          }

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
      <div className="flex flex-col h-96">
      <>
      <div className="flex gap-8 items-center justify-center">
      <div>Issues Timeline</div>
        <FormControl variant="outlined" style={{ marginBottom: '20px' }}>
          {/* <InputLabel id="timeRange-label">Time Range</InputLabel> */}
          <Select
            labelId="timeRange-label"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          //   label="Time Range"
            style={{ color: "white", backgroundColor: "#007FFF", borderRadius: "1rem", boxShadow: "1px 1px 1px white", position: "relative", top:"10px"}} 
          >
            {/* <MenuItem value="pastDay" >Past Day</MenuItem> */}
            <MenuItem value="pastWeek" >Past Week</MenuItem>
            <MenuItem value="pastMonth" >Past Month</MenuItem>
            <MenuItem value="pastYear" >Past Year</MenuItem>
          </Select>
        </FormControl>        
      </div>
        {chartData !== null && currRepo !== null 
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
            margin={{ top: 50, right: 80, bottom: 60, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
            // groupMode="grouped"
            colors={["red", "#22E0E3ff", "green"]}
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
              legend: 'Issues',
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
                    legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
                    ]}
          />
        : <div className="text-xl">N/A</div>
        }
      </>
      </div>
    </div>
  );
};

export default IssuesTimeline;