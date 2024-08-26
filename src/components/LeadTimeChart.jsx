import React, { useEffect, useRef, useState } from "react";
import { getLeadTimeMetrics } from "../services/getLeadTimeMetrics";
import { useSelector } from "react-redux";
import { darkScrollbar, useMediaQuery } from "@mui/material";
import * as d3 from "d3";
import { ResponsiveLine } from "@nivo/line";
import { Tooltip } from "@mui/material";

const LeadTimeChart = () => {
  const currRepo = useSelector((state) => state.repo.currRepo);
  const [repoInfo, setRepoInfo] = useState(null);
  const [unitsToDisplay, setUnitsToDisplay] = useState("");
  const isMobileScreen = useMediaQuery("(max-width: 420px)");
  const [isLoading, setIsLoading] = useState(true);

  // const transformDataForChart = (rawData) => {
  //   return [
  //     {
  //       id: "Lead Time", // You can use a meaningful identifier
  //       data: rawData.map((entry) => ({
  //         x: new Date(entry.merged_at),
  //         y: parseFloat(entry.average),
  //       })),
  //     },
  //   ];
  // };

  let userName = [];
  let repo = [];

  if (currRepo) {
    const repoParts = currRepo.split("/");
    userName = repoParts[0];
    repo = repoParts[1];
  }

  const handleRepoLinkClick = () => {
    window.open(`https://github.com/${userName}/${repo}`, "_blank");
  };

  const monthsInSecs = 30 * 24 * 3600;
  const weeksInSecs = 24 * 3600 * 7;
  const daysInSecs = 24 * 3600;
  const hoursInSecs = 3600;
  let dateAveragesMap = new Map();

  const convertAverageTimeInSeconds = (averageString) => {
    //remove all commas
    const parts = averageString.split(", ");

    let totalSeconds = 0;

    for (let part of parts) {
      const [value, unit] = part.split(" ");
      if (unit.includes("day")) {
        totalSeconds += parseInt(value) * 24 * 60 * 60;
      } else if (unit.includes("hour")) {
        totalSeconds += parseInt(value) * 60 * 60;
      } else if (unit.includes("minute")) {
        totalSeconds += parseInt(value) * 60;
      } else if (unit.includes("second")) {
        totalSeconds += parseInt(value);
      }
    }
    // console.log(totalSeconds);
    return totalSeconds;
  };

  const findUniqueDaysAverages = (metrics, timeUnit) => {
    let uniqueDaysAverages = [];
    //new map to place the unique dates
    const processedDates = new Set(); // Keep track of processed dates
    metrics.data.forEach((d) => {
      let average = 0;
      const mergedDate = new Date(d.merged_at);
      const date = `${mergedDate.getMonth() + 1}/${mergedDate.getDate()}`;
      if (timeUnit === "seconds") {
        average = convertAverageTimeInSeconds(d.average);
      } else if (timeUnit === "minutes") {
        average = convertAverageTimeInSeconds(d.average) / 60;
      } else if (timeUnit === "hours") {
        average = convertAverageTimeInSeconds(d.average) / hoursInSecs;
      } else if (timeUnit === "days") {
        average = convertAverageTimeInSeconds(d.average) / daysInSecs;
      } else if (timeUnit === "weeks") {
        average = convertAverageTimeInSeconds(d.average) / weeksInSecs;
      } else {
        average = convertAverageTimeInSeconds(d.average) / monthsInSecs;
      }

      if (!processedDates.has(date)) {
        processedDates.add(date);

        if (!dateAveragesMap.has(date)) {
          dateAveragesMap.set(date, { sum: 0, count: 0 });
        }

        const dateAverage = dateAveragesMap.get(date);
        dateAverage.sum += average;
        dateAverage.count++;
      }
    });

    // Calculate running averages
    processedDates.forEach((date) => {
      const dateAverage = dateAveragesMap.get(date);
      const runningAverage = dateAverage.sum / dateAverage.count;
      uniqueDaysAverages.push({
        x: date, // Use the date as the x value
        y: runningAverage, // Use the running average as the y value
      });
    });
    return uniqueDaysAverages;
  };

  useEffect(() => {
    async function fetchRepoMetrics() {
      try {
        const splitCurrRepo = currRepo?.split("/");
        // console.log(splitCurrRepo);
        const username = splitCurrRepo[0];
        const repo = splitCurrRepo[1];
        const metrics = await getLeadTimeMetrics(username, repo);
        //create constants for time type in seconds

        if (metrics) {
          // console.log('showing repo chart')
          //find the average time in seconds
          const averageInSecondsArray = metrics.data.map((item) =>
            convertAverageTimeInSeconds(item.average)
          );

          // console.log(averageInSecondsArray, "avg in seconds");

          //for y-axis, need the max value
          const maxAverageInSeconds = Math.max(...averageInSecondsArray);

          //intializes counters for time type count
          let seconds = 0;
          let minutes = 0;
          let hours = 0;
          let days = 0;
          let weeks = 0;
          let months = 0;

          metrics.data.forEach((d) => {
            const average = convertAverageTimeInSeconds(d.average);
            // console.log(average);
            if (average < 60) {
              seconds++;
            } else if (average >= 60) {
              minutes++;
            } else if (average > hoursInSecs) {
              hours++;
            } else if (average > daysInSecs) {
              days++;
            } else if (average > weeksInSecs) {
              weeks++;
            } else if (average > monthsInSecs) {
              months++;
            }
          });

          const timePrevelanceArray = [
            { seconds: seconds },
            { minutes: minutes },
            { hours: hours },
            { days: days },
            { weeks: weeks },
            { months: months },
          ];

          // console.log(timePrevelanceArray);

          timePrevelanceArray.sort((a, b) => {
            const valA = Object.values(a)[0];
            const valB = Object.values(b)[0];

            return valB - valA;
          });

          //determine the units that had the highest count to determine the unit display for average
          const unitOfTimeDisplay = Object.keys(timePrevelanceArray[0])[0];

          //set to display on y-axis legend
          setUnitsToDisplay(unitOfTimeDisplay);

          // console.log(unitOfTimeDisplay, "UNITS TO DISPLAY");

          //initialize empty array to hold the average time for each unique date
          let uniqueDaysAverages = findUniqueDaysAverages(
            metrics,
            unitOfTimeDisplay
          );
          // console.log(uniqueDays);

          //to place oldest date on the lefthand side of x-axis
          uniqueDaysAverages.reverse();
          console.log(uniqueDaysAverages, "unique days and their averages");

          const fixedChartData = [
            {
              id: `${dateAveragesMap.size} days of data`,
              data: uniqueDaysAverages,
            },
          ];
          // console.log(fixedChartData);
          setRepoInfo(fixedChartData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching repository metrics:", error);
        setIsLoading(false);
      }
    }

    const timeout = setTimeout(() => {
      setIsLoading(false); // Set loading to false if no data comes in after 10 seconds
    }, 10000);

    fetchRepoMetrics();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Tooltip
      title="
          The lead time metric shows how long on average it takes to merge a PR.
          It indicates how long senior team members take to review a PR. A
          longer lead time can mean the senior members are complacent in
          reviewing the code. This metric may vary depending on the team
          structure."
      arrow
      placement="top"
    >
      <div className="flex w-full justify-center items-center h-56">
        {isLoading ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : repoInfo && repoInfo[0].data.length > 0 ? (
          <>
            <ResponsiveLine
              data={repoInfo}
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
                legends: {
                  text: {
                    fill: "tomato",
                  },
                },
              }}
              margin={{ top: 20, right: 60, bottom: 60, left: 80 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: 0,
                max: "auto",
                stacked: false,
                reverse: false,
              }}
              // yFormat=" >-.2f"
              // fill={(d) => {
              //   console.log(d);
              //   // Check the entire array and then apply color logic
              //   const color = d.data.every(
              //     (point) => point.y >= 0 && point.y < 20
              //   )
              //     ? "red" // Example color
              //     : d.every((point) => point.y >= 20 && point.y < 25)
              //     ? "yellow" // Example color
              //     : "green"; // Example color

              //   return color;
              // }}
              colors={"#22E0E3ff"}
              borderColor={{ from: "color", modifiers: [["darker", "1.6"]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                legend: "Date",
                tickRotation: -45,
                legendOffset: 46,
                legendPosition: "middle",
                legendTextStyle: {
                  fill: "white", // Set the text color of the legend to white
                },
                textColor: {
                  fill: "white",
                },
              }}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: `Average (${unitsToDisplay})`,
                legendOffset: -40,
                legendPosition: "middle",
                text: {
                  fill: "white",
                },
              }}
              animate={true}
              enablePoints={false}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              enableGridX={false}
              enableGridY={false}
              curve="natural"
              enableSlices="x"
              enableArea={true}
              areaBaselineValue={0} // Set the baseline value for the gradient
              areaOpacity={0.2} // Set the opacity of the gradient
              enableAreaGradient={true} // Enable gradient for areas
              areaGradientColors={["#22E0E3ff", "rgba(34, 224, 227, 0)"]} // Gradient colors
              areaGradientFromOpacity={0.2} // Opacity of the start of the gradient
              areaGradientToOpacity={0} // Opacity of the end of the gradient
              sliceTooltip={({ slice }) => (
                <div>
                  <strong>{slice.points[0].data.x}</strong>
                  {slice.points.map((point) => (
                    <div key={point.id}>avg. {point.data.yFormatted}</div>
                  ))}
                </div>
              )}
              enablePointLabel={"true"}
              pointLabelYOffset={-2}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: -125,
                  translateY: -120,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
            />
          </>
        ) : (
          <div className="flex flex-col">
            <div role="status" className="mb-8">
              No Data Available.
            </div>
            <button
              onClick={handleRepoLinkClick}
              className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-4 hover:from-pink-500 hover:to-yellow-500 animate-bounce"
            >
              View Repo on GitHub
            </button>
          </div>
        )}
      </div>
    </Tooltip>
  );
};

//   const width = 500;
//   const height = 60;
//   const padding = 10;

//   const svgRef = useRef();

//   //   Elite performers Lead Time for Changes: < one day.
//   // High performers Lead Time for Changes: 1 day – 1 week.
//   // Medium performers Lead Time for Changes: 1 week – 1 month.
//   // Low performers Lead time for Changes: 1 month- 6 months.

//   const industryValues = ["Elite", "High", "Medium", "Low"];
//   //determine number of seconds industry value cap for lead time metric
//   const elite = 86400;
//   const high = 604800;
//   const medium = 24 * 60 * 60 * 30; //seconds in an average 30 day month
//   const low = Infinity;
//   //low performers will be greater than medium level

//   const colorScale = d3.scaleThreshold(
//     [elite, high, medium],
//     [
//       "rgb(0, 128, 0", // for average < 1 day
//       "rgb(6, 182, 212)", // for average < 1 week
//       "rgb(255, 255, 0)", // for average < 1 month
//       "rgb(255, 0, 0)", // for average past a month
//     ]
//   );

//   const convertAverageTimeInSeconds = (averageString) => {
//     //remove all commas
//     const parts = averageString.split(", ");

//     let totalSeconds = 0;

//     for (let part of parts) {
//       const [value, unit] = part.split(" ");
//       if (unit.includes("day")) {
//         totalSeconds += parseInt(value) * 24 * 60 * 60;
//       } else if (unit.includes("hour")) {
//         totalSeconds += parseInt(value) * 60 * 60;
//       } else if (unit.includes("minute")) {
//         totalSeconds += parseInt(value) * 60;
//       } else if (unit.includes("second")) {
//         totalSeconds += parseInt(value);
//       }
//     }
//     // console.log(totalSeconds);
//     return totalSeconds;
//   };

//   useEffect(() => {
//     // console.log(repoInfo);
//     //set up functions for scales
//     let metricLegend = "";
//     if (repoInfo && repoInfo.data && repoInfo.data.length > 0) {
//       // console.log('showing repo chart')
//       //find the average time in seconds
//       const averageInSecondsArray = repoInfo?.data.map((item) =>
//         convertAverageTimeInSeconds(item.average)
//       );

//       //for y-axis, need the max value
//       const maxAverageInSeconds = Math.max(...averageInSecondsArray);

//       //convert the merged at into a new date
//       repoInfo.data?.forEach((d) => {
//         d.merged_at = new Date(d.merged_at);
//       });

//       //get the unique days represented
//       const uniqueDays = Array.from(
//         new Set(
//           repoInfo.data.map((d) => {
//             return d.merged_at.getDate();
//           })
//         )
//       );

//       // console.log(maxAverageInSeconds)
//       //xscales
//       const xScale = d3
//         .scaleTime()
//         .domain(
//           d3.extent(repoInfo.data, (d) => {
//             return d.merged_at;
//           })
//         )
//         .range([0, width]);

//       //yscales
//       const yScale = d3
//         .scaleLinear()
//         .domain([0, maxAverageInSeconds])
//         .range([height - padding, 0 + padding - 100]);

//       // Define x-axis scale by applying unique days of commits and average merge time from commit
//       let xAxis = d3
//         .axisBottom(xScale)
//         .tickValues(
//           uniqueDays.map((day) => {
//             return new Date(
//               repoInfo.data?.find((d) => {
//                 return d.merged_at.getDate() === day;
//               }).merged_at
//             );
//           })
//         )
//         .tickFormat(d3.timeFormat("%m/%d"));

//       //customize a axis tick values to show one week's worth
//       const xAxisTicks = xScale.ticks(7);

//       //apply the ticks customization
//       xAxis = d3.axisBottom(xScale).tickValues(xAxisTicks);

//       //customize y axis tick values to show less
//       const yAxisTicks = yScale.ticks(5);

//       // Define y-axis scale and axis
//       const yAxis = d3.axisLeft(yScale).tickValues(yAxisTicks);

//       // Render x-axis
//       const xAxisGroup = d3
//         .select(svgRef.current)
//         .append("g")
//         .attr("class", "x-axis")
//         .attr("transform", `translate(0, ${height - padding})`)
//         .call(xAxis);

//       // Rotate x-axis tick labels
//       xAxisGroup
//         .selectAll(".tick text")
//         .attr("transform", "translate(-10,10) rotate(-45)")
//         .style("text-anchor", "end");

//       // Render y-axis
//       d3.select(svgRef.current)
//         .append("g")
//         .attr("class", "y-axis")
//         .attr("transform", `translate(0, 0)`)
//         .call(yAxis);

//       //setup functions to drawlines
//       const line = d3
//         .line()
//         .x((data) => xScale(data.merged_at))
//         .y((data) => yScale(convertAverageTimeInSeconds(data.average)))
//         .curve(d3.curveNatural);

//       // X-axis label
//       d3.select(svgRef.current)
//         .append("text")
//         .attr("class", "x-axis-label")
//         .attr("x", width / 2)
//         .attr("y", height - padding / 2 + 60)
//         .style("text-anchor", "middle")
//         .style("fill", "white")
//         .style("font-size", "12px")
//         .text("Merged On");

//       // Y-axis label
//       d3.select(svgRef.current)
//         .append("text")
//         .attr("class", "y-axis-label")
//         .attr("transform", "rotate(-90)")
//         .attr("x", -height / 3 - 30)
//         .attr("y", padding / 3 - 40)
//         .style("text-anchor", "middle")
//         .style("fill", "white")
//         .style("font-size", "12px")
//         .text("Average");

//       // Create and render the area chart
//       const areaGenerator = d3
//         .area()
//         .x((data) => xScale(data.merged_at))
//         .y0(yScale(0)) // Start at the bottom of the chart
//         .y1((data) => yScale(convertAverageTimeInSeconds(data.average)))
//         .curve(d3.curveNatural);

//       // Render the area chart
//       const areaChart = d3
//         .select(svgRef.current)
//         .append("g")
//         .attr("class", "area-chart");

//       areaChart
//         .selectAll(".area-path")
//         .data([repoInfo.data])
//         .enter()
//         .append("path")
//         .attr("class", "area-path")
//         .attr("d", areaGenerator)
//         .attr("fill", (data) => {
//           return data.map((value) => {
//             console.log(convertAverageTimeInSeconds(value.average));
//             console.log(colorScale(convertAverageTimeInSeconds(value.average)));
//             return colorScale(convertAverageTimeInSeconds(value.average));
//           });
//         })
//         .attr("stroke", "#67e8f9")
//         .attr("stroke-width", 2);

//       // Initialize legend
//       const legendItemSize = 12;
//       const legendSpacing = 4;
//       const xOffset = width + 20; // Adjust this as needed
//       const yOffset = 20; // Adjust this as needed

//       // Select the legend SVG element
//       const legendSvg = d3.select(svgRef.current).append("svg");

//       const colorMap = {
//         Elite: colorScale(elite),
//         High: colorScale(high),
//         Medium: colorScale(medium),
//         Low: colorScale(low), // You can use the max average value as the color for the "Low" category
//       };

//       // Create legend items
//       const legendItems = legendSvg
//         .selectAll(".legendItem")
//         .data(industryValues)
//         .enter();

//       // Append colored rectangles
//       legendItems
//         .append("rect")
//         .attr("class", "legendItem")
//         .attr("width", legendItemSize)
//         .attr("height", legendItemSize)
//         .style("fill", (d) => colorMap[d]) // Use the colorMap to get the correct color
//         .attr(
//           "transform",
//           (d, i) =>
//             `translate(${xOffset}, ${
//               yOffset + (legendItemSize + legendSpacing) * i
//             })`
//         );
//     }
//   }, [repoInfo]);

//   return (
//     <div className="flex w-full justify-center items-center mt-12 h-56">
//       {/* <svg id="chart" ref={svgRef} viewBox="-60 -168 600 400">
//         <path d="" fill="" stroke="white" strokeWidth="5" />
//       </svg> */}
//       <ResponsiveLine
//         // data={repoInfo?.data}
//         margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//         xScale={{ type: "point" }}
//         yScale={{
//           type: "linear",
//           min: "auto",
//           max: "auto",
//           stacked: true,
//           reverse: false,
//         }}
//         yFormat=" >-.2f"
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: "transportation",
//           legendOffset: 36,
//           legendPosition: "middle",
//         }}
//         axisLeft={{
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: "count",
//           legendOffset: -40,
//           legendPosition: "middle",
//         }}
//         pointSize={10}
//         pointColor={{ theme: "background" }}
//         pointBorderWidth={2}
//         pointBorderColor={{ from: "serieColor" }}
//         pointLabelYOffset={-12}
//         useMesh={true}
//         legends={[
//           {
//             anchor: "bottom-right",
//             direction: "column",
//             justify: false,
//             translateX: 100,
//             translateY: 0,
//             itemsSpacing: 0,
//             itemDirection: "left-to-right",
//             itemWidth: 80,
//             itemHeight: 20,
//             itemOpacity: 0.75,
//             symbolSize: 12,
//             symbolShape: "circle",
//             symbolBorderColor: "rgba(0, 0, 0, .5)",
//             effects: [
//               {
//                 on: "hover",
//                 style: {
//                   itemBackground: "rgba(0, 0, 0, .03)",
//                   itemOpacity: 1,
//                 },
//               },
//             ],
//           },
//         ]}
//       />
//     </div>
//   );
// };

export default LeadTimeChart;

//  {repoInfo?.data.map((data, index) => (
//             <li key={index} className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 whitespace-normal">
//               Merged At: {data.merged_at}, Average: {data.average}
//             </li>
//           ))}
