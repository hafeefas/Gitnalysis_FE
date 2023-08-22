import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BsActivity } from "react-icons/bs";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from '@nivo/line'

const Activity = () => {
  const [activity, setActivity] = useState(null);
  const [chartData, setChartData] = useState(null);
  const currRepo = useSelector((state) => state.repo.currRepo);
  const [ practiceData, setPracticeData ] = useState(
  
  [
    {
      "id": "japan",
      "color": "hsl(68, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 81
        },
        {
          "x": "helicopter",
          "y": 14
        },
        {
          "x": "boat",
          "y": 260
        },
        {
          "x": "train",
          "y": 77
        },
        {
          "x": "subway",
          "y": 131
        },
        {
          "x": "bus",
          "y": 57
        },
        {
          "x": "car",
          "y": 297
        },
        {
          "x": "moto",
          "y": 54
        },
        {
          "x": "bicycle",
          "y": 235
        },
        {
          "x": "horse",
          "y": 197
        },
        {
          "x": "skateboard",
          "y": 200
        },
        {
          "x": "yomaa",
          "y": 50
        },
        {
          "x": "yomama",
          "y": 197
        },
        {
          "x": "jsodsd",
          "y": 200
        },
        {
          "x": "sdklnlksdn",
          "y": 50
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(203, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 205
        },
        {
          "x": "helicopter",
          "y": 138
        },
        {
          "x": "boat",
          "y": 126
        },
        {
          "x": "train",
          "y": 63
        },
        {
          "x": "subway",
          "y": 25
        },
        {
          "x": "bus",
          "y": 66
        },
        {
          "x": "car",
          "y": 7
        },
        {
          "x": "moto",
          "y": 89
        },
        {
          "x": "bicycle",
          "y": 67
        },
        {
          "x": "horse",
          "y": 252
        },
        {
          "x": "skateboard",
          "y": 91
        },
        {
          "x": "others",
          "y": 8
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(132, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 136
        },
        {
          "x": "helicopter",
          "y": 241
        },
        {
          "x": "boat",
          "y": 87
        },
        {
          "x": "train",
          "y": 81
        },
        {
          "x": "subway",
          "y": 93
        },
        {
          "x": "bus",
          "y": 101
        },
        {
          "x": "car",
          "y": 271
        },
        {
          "x": "moto",
          "y": 109
        },
        {
          "x": "bicycle",
          "y": 18
        },
        {
          "x": "horse",
          "y": 121
        },
        {
          "x": "skateboard",
          "y": 65
        },
        {
          "x": "others",
          "y": 199
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(319, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 128
        },
        {
          "x": "helicopter",
          "y": 115
        },
        {
          "x": "boat",
          "y": 220
        },
        {
          "x": "train",
          "y": 151
        },
        {
          "x": "subway",
          "y": 232
        },
        {
          "x": "bus",
          "y": 163
        },
        {
          "x": "car",
          "y": 267
        },
        {
          "x": "moto",
          "y": 247
        },
        {
          "x": "bicycle",
          "y": 259
        },
        {
          "x": "horse",
          "y": 22
        },
        {
          "x": "skateboard",
          "y": 7
        },
        {
          "x": "others",
          "y": 259
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(357, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 249
        },
        {
          "x": "helicopter",
          "y": 195
        },
        {
          "x": "boat",
          "y": 128
        },
        {
          "x": "train",
          "y": 63
        },
        {
          "x": "subway",
          "y": 196
        },
        {
          "x": "bus",
          "y": 176
        },
        {
          "x": "car",
          "y": 208
        },
        {
          "x": "moto",
          "y": 230
        },
        {
          "x": "bicycle",
          "y": 168
        },
        {
          "x": "horse",
          "y": 114
        },
        {
          "x": "skateboard",
          "y": 63
        },
        {
          "x": "others",
          "y": 291
        }
      ]
    }
  ])

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
          `${process.env.REACT_APP_BACKEND_URL}/api/repos/${username}/${repo}/getActivity/week`
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
            fixedChartData[0].data.push({
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
  }, [currRepo]);

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
      <>
        {/* <div style={{ color: "#007FFF" }}>Graph goes here</div> */}
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