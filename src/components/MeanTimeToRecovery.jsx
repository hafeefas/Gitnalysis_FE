import react, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import axios from "axios";
import { Tooltip } from '@mui/material';
import {Typography} from '@mui/material';

const MTTR = () => {
    const [mttr, setMttr] = useState(0)
    const currRepo = useSelector((state) => state.repo.currRepo);

    let userName = [];
    let repo = [];

    if (currRepo) {
        const repoParts = currRepo.split("/");
        userName = repoParts[0];
        repo = repoParts[1];
    }

    useEffect(()=> {
        async function getMTTR (){
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/deployments/${userName}/${repo}/mttr`,
                {},
                { withCredentials: true })

                // console.log(response.data.mttr)
                setMttr(response.data.mttr)
                
            } catch (error) {
                console.log(error)
            }
        }
        getMTTR()
    }, [currRepo])

    return (
        <div className="flex flex-col justify-center h-full">
            <Tooltip 
                title="Mean Time to Recovery (MTTR) refers to the average time required to restore a system after an unexpected failure or interruption. It's a critical metric in evaluating the efficiency of recovery strategies and understanding system reliability. A lower MTTR indicates a more resilient system. In this context, the MTTR calculation is based on the deployment status. Generally, an MTTR of a few hours or less is considered good, especially for critical systems, but this can vary based on business and operational requirements."
                placement="top"
                arrow>
               <div style={{ color: "#007FFF" }}>MTTR</div>
        {mttr !== null && currRepo !== null 
        ? <div className="text-xl">{mttr} hrs</div>
        : <div className="text-xl">N/A</div>
        }
            </Tooltip>
            
        </div>
    );

}

export default MTTR

