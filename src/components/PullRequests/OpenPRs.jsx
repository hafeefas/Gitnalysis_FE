import React, {useEffect, useState} from "react";
import axios from "axios";

const OpenPullRequests = ({fullRepo}) => {
    const [openPRs, setOpenPRs] = useState(0)

    useEffect(() => {
        async function getOpenPrs (){
            try {
                if (typeof fullRepo !== 'string') {
                    console.error('fullRepo should be a string');
                    return;
                }
                console.log("repoINfo,", fullRepo)
                const repoParts = fullRepo.split('/')
                const username = repoParts[0];
                console.log(username)
                const repo = repoParts[1];
                        
                const response = await axios.get(`http://localhost:8080/api/pull-requests/merge-success-rate/${username}/${repo}`)
                const totalPullReqs = response.data.totalPullRequests
                const closedReqs = response.data.successfullyMergedPRs
                const openPR = totalPullReqs - closedReqs
                setOpenPRs(openPR)
            } catch (error) {
                console.log(error)
            }
        }

        getOpenPrs()
    }, [fullRepo])

    return (
        <div className="flex flex-col justify-center h-full">
            <div style={{color: 'lightgreen'}}>Open PRs</div>
            {openPRs !== null && <div className="text-xl">{openPRs}</div>}
           
        </div>
    )

}

export default OpenPullRequests