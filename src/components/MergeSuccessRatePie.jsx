import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import {ResponsivePie} from "@nivo/pie";

const MergeSuccessRatePie = () => {
    const [rate, setRate] = useState(null);
    const [chartData, setChartData] = useState(0)
    const currRepo = useSelector((state) => state.repo.currRepo);

    useEffect(() => {
        async function mergedPullRequests (){
            try {
                if (typeof currRepo !== 'string') {
                    console.error('fullRepo should be a string');
                    return;
                }
                console.log("repoINfo,", currRepo)
                const repoParts = currRepo.split('/')
                const username = repoParts[0];
                const repo = repoParts[1];
                        
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/pull-requests/merge-success-rate/${username}/${repo}`)
                setRate(response.data.mergeSuccessRate)

                const chartData = [
                    {
                        id: "successfullyMergedPRs",
                        value: response.data.successfullyMergedPRs,
                    },
                    {
                        id: "unsuccessfulPullRequests",
                        value: response.data.totalPullRequests - response.data.successfullyMergedPRs,
                    },       
                ]
                setChartData(chartData);
            } catch (error) {
                console.log(error)
            }
        }
        mergedPullRequests()
    }, [currRepo])
  return (


<div className="flex flex-col justify-center h-full">
            <div className="pink-text">Pull Request Merge Success Rate</div>
            {rate !== null && currRepo !== null 
            ?    <ResponsivePie
        data={chartData}
        isInteractive={false}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}

        colors = {["#22E0E3ff", "red"]}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 60,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
            :<div className="text-xl">N/A</div>
            }
        </div>


  )
}

export default MergeSuccessRatePie