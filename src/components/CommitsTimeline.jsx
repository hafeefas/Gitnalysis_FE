import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';

function CommitsTimeline({ data }) {
    const [commitData, setCommitData] = useState([]);
    console.log(data)

    useEffect(() => {
        if(!data){
            return
        }
        const transformedData = [
            {
                id: 'commits',
                data: Object.entries(data).map(([date, count]) => ({
                    x: date,
                    y: count,
                }))
            }
        ];

        console.log(transformedData)
    
        setCommitData(transformedData)
    }, [data])

    return (
        <div style={{ height: '500px' }}>
            <ResponsiveLine
                data={commitData}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                yFormat=" >-f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'date',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'commit count',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                colors={{ scheme: 'nivo' }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
            />
        </div>
    );
}

export default CommitsTimeline;

