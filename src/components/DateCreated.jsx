import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import axios from "axios";

const DateCreated = () => {
  const [datesObject, setDatesObject] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const currRepo = useSelector((state) => state.repo.currRepo);

  useEffect(() => {
    async function getDates() {
      try {
        if (typeof currRepo !== "string") {
          console.error("currRepo should be a string");
          return;
        }
        // console.log("repoInfo,", currRepo);
        const repoParts = currRepo.split("/");
        const username = repoParts[0];
        // console.log(username);
        const repo = repoParts[1];

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/repos/${username}/${repo}/getRepo/dates`
        );

        setDatesObject(response.data.repoDates);
      } catch (error) {
        console.log(error);
      }
    }

    getDates();
  }, [currRepo]);

  return (
    <div
    className="flex flex-col justify-center h-full"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    {isHovered ? (
      <>
        <div>Last Push</div>
        {datesObject !== null && currRepo !== null 
        ? <div className="text-xl">{datesObject.pushedAt + " (" + datesObject.pushedTimeAgo + ")"}</div>
        : <div className="text-xl">N/A</div>
        }
      </>
    ) : (
      <>
        <div>Repo Created</div>
        {datesObject !== null && currRepo !== null 
        ? <div className="text-xl">{datesObject.createdAt + " (" + datesObject.createdTimeAgo + ")"}</div>
        : <div className="text-xl">N/A</div>
        }
      </>
    )}
  </div>
  
  );
};

export default DateCreated;