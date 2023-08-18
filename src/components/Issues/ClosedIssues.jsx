import React, {useEffect, useState} from 'react'
import axios from 'axios'


const ClosedIssues = ({fullRepo}) => {
    const [closedIssues, setClosedIssues] = useState(0)

    useEffect(()=> {
        async function getClosedIssues () {
            try {
                if (typeof fullRepo !== "string") {
                    console.error("fullRepo should be a string");
                    return;
                  }
                  const repoParts = fullRepo.split("/");
                  const username = repoParts[0];
                  const repo = repoParts[1];
          
                  const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/issues/${username}/${repo}/count/getNum`
                  );

                  console.log(response.data)

                  setClosedIssues(response.data.issues.numClosed)
                
            } catch (error) {
                console.log(error)
                
            }
        }
        getClosedIssues()
    }, [fullRepo])

    return (
        <div className="flex flex-col justify-center h-full">
      <>
        <div style={{ color: "#007FFF" }}>Closed Issues</div>
        {closedIssues !== null && <div className="text-xl">{closedIssues}</div>}
      </>
    </div>

    )
}

export default ClosedIssues