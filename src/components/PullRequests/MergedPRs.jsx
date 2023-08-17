import React, {useEffect, useState} from "react";
import axios from "axios";


const MergedPRCount = ({fullRepo}) => {
    const [mergedPr, setMergedPr] = useState(0)
    const [closedPrs, setClosedPrs] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    

    useEffect(() => {
        async function mergedPullRequests (){
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
                console.log(response.data.mergeSuccessRate)
                setMergedPr(response.data.mergeSuccessRate)

                setClosedPrs(response.data.successfullyMergedPRs)
                
            } catch (error) {
                console.log(error)
            }
        }
        mergedPullRequests()
    }, [fullRepo])

    return(
        <div className="flex flex-col justify-center h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
            <div style={{color: 'pink'}}>Merge Success Rate</div>
            {mergedPr !== null && <div className="text-xl">{mergedPr}%</div>}
            {isHovered && closedPrs !== null && <div>Closed PRs: {closedPrs}</div>}
        </div>
    )
}



export default MergedPRCount