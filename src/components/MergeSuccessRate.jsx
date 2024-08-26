import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { Tooltip } from '@mui/material';

const MergeSuccessRate = () => {
    const [mergedPr, setMergedPr] = useState(0)
    const currRepo = useSelector((state) => state.repo.currRepo);
    useEffect(() => {
        async function mergedPullRequests (){
            try {
                if (typeof currRepo !== 'string') {
                    console.error('fullRepo should be a string');
                    return;
                }
                // console.log("repoINfo,", currRepo)
                const repoParts = currRepo.split('/')
                const username = repoParts[0];
                // console.log(username)
                const repo = repoParts[1];
                        
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/pull-requests/merge-success-rate/${username}/${repo}`)
                // console.log(response.data.mergeSuccessRate)
                setMergedPr(response.data.mergeSuccessRate)
                
            } catch (error) {
                console.log(error)
            }
        }
        mergedPullRequests()
    }, [currRepo])
    return (
        <div className="flex flex-col justify-center h-full">
            <div className="pink-text">Pull Request Merge Success Rate</div>
            {mergedPr !== null && 
                <Tooltip 
                title= "The Pull Request Merge Success Rate indicates the percentage of pull requests that were successfully merged. A higher percentage generally suggests a smoother collaboration and review process. Typically, a rate of 90% or above is considered good, though this can vary based on factors like project type, size, and review processes."
            >
                <div className="text-xl">{mergedPr}%</div>
            </Tooltip>
            }
        </div>
    );
    }
    
    export default MergeSuccessRate
    {/* <div className="flex flex-col justify-center h-full">
                <div className="pink-text">Pull Request Merge Success Rate</div>
                {mergedPr !== null && <div className="text-xl">{mergedPr}%</div>}
            </div> */}