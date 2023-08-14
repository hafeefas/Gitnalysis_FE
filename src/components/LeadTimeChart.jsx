import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const LeadTimeChart = ({repoInfo}) => {
    //M50,50 = move 50 across, 50 down, L100,150 = draw line to 100 above, 150 down

  const width = 500;
  const height = 150;
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
      console.log(totalSeconds);
    return totalSeconds;
  }
  
  useEffect(() => {

    //set up functions for scales
    if (repoInfo && repoInfo.data && repoInfo.data.length > 0) {
      console.log('showing repo chart')
      const averageInSecondsArray = repoInfo?.data.map(item => convertAverageTimeInSeconds(item.average));
      console.log(averageInSecondsArray);
  const maxAverageInSeconds = Math.max(...averageInSecondsArray);
    //xscales
    console.log(maxAverageInSeconds)
    const xScale = d3.scalePoint().domain(repoInfo?.data.map((data) => data.merged_at )).range([(0+padding),(width-padding)])
    console.log('start - end',xScale(repoInfo.data[0].merged_at),xScale(repoInfo.data[(repoInfo.data.length)-1].merged_at));
    //yscales
    const yScale = d3.scaleLinear().domain([0,maxAverageInSeconds]).range([(height-padding),(0 + padding)])
    console.log('start - end',yScale(maxAverageInSeconds),yScale(0));
    
    //setup functions to drawlines
    const line = d3.line()
      .x(data => xScale(data.merged_at))
      .y(data => yScale(convertAverageTimeInSeconds(data.average)));
    console.log('chart draw commands', line(repoInfo.data))
      
    //raw line
    const path = d3.select(svgRef.current).select('path')
    .attr('data', (value) => line(repoInfo.data))
    .attr('fill','none')
    .attr('stroke','white')

     // Generate path data for the line
    const pathData = line(repoInfo.data);

    // Set the 'd' attribute of the path element with the generated path data
    path.attr('d', pathData);
  
  }
  },[repoInfo])
return (
    <div>
        <svg id="chart" ref={svgRef} viewBox="0 0 500 150">
            <path d="" fill="none" stroke="white" strokeWidth="5"/>
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