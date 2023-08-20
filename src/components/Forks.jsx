import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import axios from "axios";

const Forks = ({ fullRepo }) => {
  const [forks, setForks] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const currRepo = useSelector((state) => state.repo.currRepo);

  useEffect(() => {
    async function getForks() {
      try {
        if (typeof currRepo !== "string") {
          console.error("fullRepo should be a string");
          return;
        }
        const repoParts = currRepo.split("/");
        const username = repoParts[0];
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
  }, [currRepo]);

  return (
    <div
    className="flex flex-col w-full h-full items-center justify-center justify-content-center"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    {isHovered && forks!==null && currRepo!==null && forks.length>0? (
      <>
        <div className="text-xl">Forks</div>
        {<div>
            {forks.map(fork => (
               <div className="border-b p-2"> 
                <img className="rounded-3xl m-2 inline-block" src={fork.forkerAvatar} alt="forker avatar" height="40px" width="40px"/>
                <span className="text-sm m-2 inline-block">{fork.forkedTimeAgo}</span>
                <div className="text-base text-sm">{fork.forkedFullRepoName}</div>
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
        {forks!==null && currRepo!==null ? <div className="text-xl">{forks.length}</div> : <div className="text-xl">0</div>}
      </>
    )}
  </div>
  
  );
};

export default Forks;