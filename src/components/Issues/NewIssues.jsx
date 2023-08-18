import React, {useEffect, useState} from 'react'
import axios from 'axios'


const NewIssues = ({fullRepo}) => {
    const [newIssues, setNewIssues] = useState(0)
    const [totalIssues, setTotalIssues] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(()=> {
        async function getNewIssues () {
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
                  console.log(response.data.issues.numAll)

                  setNewIssues(response.data.issues.numOpen)
                  setTotalIssues(response.data.issues.numAll)
                
            } catch (error) {
                console.log(error)
                
            }
        }
        getNewIssues()
    }, [fullRepo])

    return (

        <div
        className="flex flex-col justify-center h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <>
            <div style={{ color: "#E52B50" }}>Total Issues</div>
            {totalIssues !== null && <div className="text-xl">{totalIssues}</div>}
          </>
        ) : (
          <>
            <div style={{ color: "#E52B50" }}>New Issues</div>
        {newIssues !== null && <div className="text-xl">{newIssues}</div>}
          </>
        )}
      </div>
      
    )
}

export default NewIssues