import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Stargazers = () => {
    const [stargazers, setStargazers] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const currRepo = useSelector((state) => state.repo.currRepo);
  
    useEffect(() => {
      async function getNewIssues() {
        try {
          if (typeof currRepo !== "string") {
            console.error("currRepo should be a string");
            return;
          }
          const repoParts = currRepo.split("/");
          const username = repoParts[0];
          const repo = repoParts[1];
  
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/stars/${username}/${repo}/stargazers`
          );
  
          setStargazers(response.data.stargazers);
        } catch (error) {
          console.log(error);
        }
      }
      getNewIssues();
    }, [currRepo]);

  return (
    <div
      className= {isHovered?"justify-center items-center h-full w-full overflow-scroll p-4": "flex flex-col justify-center items-center h-full w-full overflow-scroll"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && stargazers!==null && currRepo!==null &&stargazers.length>0 ? (
        <>
          {/* <div>Stargazers</div> */}
          {stargazers !== null && currRepo !== null 
          ? (
            <>
            {stargazers.map(stargazer => (
                <div className="flex justify-center items-center gap-4 mb-2" key={stargazer.username}>
                    <img className="rounded-3xl" src={stargazer.avatarUrl} alt="stargazer-avatar" height="40px" width="40px"/>
                    <div className="text-xl">{stargazer.username}</div>
                </div>
            ))}
            </>

            )
           : null
          }
        </>
      ) : (
        <>
          <div >Stargazers</div>
          {stargazers !== null && currRepo !== null 
          ? <div className="text-xl">{stargazers.length}</div> 
          : <div className="text-xl">N/A</div> }
        </>
      )}

    </div>


  )
}

export default Stargazers