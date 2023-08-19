import React, { useEffect, useState } from "react";
import axios from "axios";

const Forks = ({ fullRepo }) => {
  const [forks, setForks] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const [page, setPage] = useState()

  useEffect(() => {
    async function getForks() {
      try {
        if (typeof fullRepo !== "string") {
          console.error("fullRepo should be a string");
          return;
        }
        console.log("repoINfo,", fullRepo);
        const repoParts = fullRepo.split("/");
        const username = repoParts[0];
        console.log(username);
        const repo = repoParts[1];

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/forks/${username}/${repo}/personalized`
        );
        const forksResponse = response.data.forks;
        setForks(forksResponse);
      } catch (error) {
        console.log(error);
      }
    }
    getForks();
  }, [fullRepo]);

  return (
    <div
    className="flex flex-col w-full h-full items-center justify-center justify-content-center"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    {isHovered && forks!== null ? (
      <>
        <div className="text-2xl">Forks</div>
        {<div className="text-xl">
            {forks.map(fork => (
               <div className="border-b p-2"> 
                <img className="rounded-3xl m-2 inline-block" src={fork.forkerAvatar} alt="forker avatar" height="40px" width="40px"/>
                <span className="text-sm m-2 inline-block">{fork.forkedTimeAgo}</span>
                <div className="text-base">{fork.forkedFullRepoName}</div>
                {/* <img className="rounded-3xl m-2 inline-block" src={fork.forkerAvatar} alt="forker avatar" height="40px" width="40px"/>
                <span className="text-sm m-2 inline-block">{fork.forkedTimeAgo}</span>
                <div className="text-base">{fork.forkedFullRepoName}</div> */}
               </div> 
            ))
            }
        </div>}
        <button>next</button>
      </>
    ) : (
      <>
        <div>Forks</div>
        {<div className="text-xl">{forks.length}</div>}
      </>
    )}
  </div>
  
  );
};

export default Forks;