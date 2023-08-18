import React, {useEffect, useState} from 'react'
import axios from 'axios'


const NewIssues = ({fullRepo}) => {
    const [newIssues, setNewIssues] = useState(0)

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
                    `http://localhost:8080/api/issues/${username}/${repo}/count/getNum`
                  );

                  console.log(response.data)

                  setNewIssues(response.data.issues.numOpen)
                
            } catch (error) {
                console.log(error)
                
            }
        }
        getNewIssues()
    }, [fullRepo])

    return (
        <div className="flex flex-col justify-center h-full">
      <>
        <div style={{ color: "#E52B50" }}>Closed Issues</div>
        {newIssues !== null && <div className="text-xl">{newIssues}</div>}
      </>
    </div>

    )
}

export default NewIssues