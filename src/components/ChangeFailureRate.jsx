import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { ResponsivePie } from '@nivo/pie'
import axios from 'axios'



const CFR = () => {
    const [cfr, setCfr] = useState(0)
    const currRepo = useSelector((state) => state.repo.currRepo);

    useEffect(()=> {
        async function getCFR (){
            try {
                if (typeof currRepo !== "string") {
                    console.error("currRepo should be a string");
                    return;
                }
                  const repoParts = currRepo.split("/");
                  const username = repoParts[0];
                  const repo = repoParts[1];

                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/deployments/${username}/${repo}/cfr`, {withCredentials: true})
                console.log("cfr",response.data)
                setCfr(response.data)
                
                
            } catch (error) {
                console.log(error)
            }
        }
        getCFR()

    }, [currRepo])
    if (cfr === null) return <div>Loading...</div>;

    const data = [
        {
            id: "CFR",
            label: "Change Failure Rate",
            value: cfr
        },
        {
            id: "Success",
            label: "Sucessful Deployments",
            value: 100 - cfr
        }
    ];

    return (
        <div style={{ height: 400, width: 400 }}>
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={['#E31837', '#00FFFF']} // Change colors as per your requirement
                borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
                radialLabel="id"
            />
            
        </div>
    )
}

export default CFR