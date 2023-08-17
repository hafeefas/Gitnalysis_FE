import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const LeadTimeChart = ({repoInfo}) => {
  const width = 400;
  const height = 120;
  const padding = 20;

  const svgRef = useRef();

  const convertAverageTimeInSeconds = (averageString) => {
    //remove all commas
    const parts = averageString.split(', ');
    
    let totalSeconds = 0;

    for (let part of parts){
      const [value, unit] = part.split(' ');
         if (unit.includes('day')) {
            totalSeconds += parseInt(value) * 24 * 60 * 60;
        } else if (unit.includes('hour')) {
            totalSeconds += parseInt(value) * 60 * 60;
        } else if (unit.includes('minute')) {
            totalSeconds += parseInt(value) * 60;
        } else if (unit.includes('second')) {
            totalSeconds += parseInt(value);
        }
      }
      // console.log(totalSeconds);
    return totalSeconds;
  }
  
  useEffect(() => {
    // console.log(repoInfo);
    //set up functions for scales
    if (repoInfo && repoInfo.data && repoInfo.data.length > 0) {
      // console.log('showing repo chart')
      //find the average time in seconds
      const averageInSecondsArray = repoInfo?.data.map(item => convertAverageTimeInSeconds(item.average));
      const maxAverageInSeconds = Math.max(...averageInSecondsArray);

      repoInfo.data?.forEach((d) => {
        d.merged_at = new Date(d.merged_at);
      });

      //get the unique days represented
      const uniqueDays = Array.from(new Set(repoInfo.data.map((d) => {
        return d.merged_at.getDate();
      })));

       const createGradient = select => {
    const gradient = select
      .select('defs')
        .append('linearGradient')
          .attr('id', 'gradient')
          .attr('gradientTransform', 'rotate(90)');
  gradient
  .append('stop')
  .attr('stop-color', '#F2C66B')
  .attr('offset', '0%');
  
  gradient
  .append('stop')
  .attr('stop-color', '#D13D73')
  .attr('offset', '100%');

    gradient
      .append('stop')
        .attr('offset', '0%')
        .attr('style', 'stop-color:#BBF6CA;stop-opacity:0.05');

    gradient
      .append('stop')
        .attr('offset', '100%')
        .attr('style', 'stop-color:#BBF6CA;stop-opacity:.5');
  }
  

    // console.log(maxAverageInSeconds)
    //xscales
    const xScale = d3.scaleTime()
      .domain(d3.extent(repoInfo.data, (d) => { return d.merged_at; }))
      .range([0, width]);

    //yscales
    const yScale = d3.scaleLinear().domain([0,maxAverageInSeconds]).range([(height-padding),(0 + padding)])


    // Define x-axis scale and axis
    const xAxis = d3.axisBottom(xScale).tickValues(uniqueDays.map((day) => {
    return new Date(repoInfo.data?.find((d) => {
      return d.merged_at.getDate() === day;
    }).merged_at);
  })).tickFormat(d3.timeFormat("%d"));
  
    //customize y axis tick values to show less
    const yAxisTicks = yScale.ticks(5);

    // Define y-axis scale and axis
    const yAxis = d3.axisLeft(yScale).tickValues(yAxisTicks);

    console.log(createGradient,'create gradient');

      // Render x-axis
    d3.select(svgRef.current)
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height - padding})`)
    .call(xAxis);

    // Render y-axis
    d3.select(svgRef.current)
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${padding}, 0)`)
    .call(yAxis);
    
    //setup functions to drawlines
    const line = d3.line()
      .x(data => xScale(data.merged_at))
      .y(data => yScale(convertAverageTimeInSeconds(data.average)))
      .curve(d3.curveNatural);

      const areaGenerator = d3
    .area()
    .x(data => xScale(data.merged_at))
    .y0(yScale(0)) // The bottom of the area
    .y1(data => yScale(convertAverageTimeInSeconds(data.average)))
    .curve(d3.curveNatural);

      // Select the 'path.area' element within svgRef.current
  d3.select(svgRef.current)
    .select('path.area') // Correctly select the path with class 'area'
    .datum(repoInfo.data)
    .attr('class', 'area')
    .attr('d', areaGenerator)
    .attr('fill', 'url(#gradient)') // Apply the gradient fill
    .attr('stroke', 'white')
    .attr('stroke-width', 5);

      // X-axis label
d3.select(svgRef.current)
  .append("text")
  .attr("class", "x-axis-label")
  .attr("x", width / 2)
  .attr("y", height - padding / 2 + 20)
  .style("text-anchor", "middle")
  .style("fill", "white")
  .style("font-size", "12px")
  .text("Merged At");

// Y-axis label
d3.select(svgRef.current)
  .append("text")
  .attr("class", "y-axis-label")
  .attr("transform", "rotate(-90)")
  .attr("x", -height / 3 - 30)
  .attr("y", padding / 3 -20) 
  .style("text-anchor", "middle")
  .style("fill", "white")
  .style("font-size", "12px")
  .text("Average");
      
    //draw line
    const path = d3.select(svgRef.current).select('path')
    .attr('data', (value) => line(repoInfo.data))
    .attr('fill','url(#gradient)')
    .attr('stroke','#22E0E3ff')
    .attr('stroke-width', 2);

     // Generate path data for the line
    const pathData = line(repoInfo.data);

    // Set the 'd' attribute of the path element with the generated path data
    path.attr('d', pathData);
  
  }
  },[repoInfo])
return (
    <div className="flex w-full justify-center items-center">
        <svg id="chart" ref={svgRef} viewBox="-50 -5 500 150">
            <path d="" fill="url(#gradient)" stroke="white" strokeWidth="5"/>
        </svg>
    </div>
  )
}

export default LeadTimeChart

//  {repoInfo?.data.map((data, index) => (
//             <li key={index} className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 whitespace-normal">
//               Merged At: {data.merged_at}, Average: {data.average}
//             </li>
//           ))}