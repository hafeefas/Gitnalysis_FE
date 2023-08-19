import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import axios from "axios";

const CommentsPerCodeRatio = ({ fullRepo }) => {
  const [commentsPerCodeData, setCommentsPerCodeData] = useState(null);
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
          `${process.env.REACT_APP_BACKEND_URL}/api/repos/comments-per-code/${username}/${repo}`
        );
        const responseData = response.data;
        setCommentsPerCodeData(responseData);
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
    {isHovered && commentsPerCodeData!==null && currRepo!==null ? (
        <>
            <div className="text-l">Lines of Code: {commentsPerCodeData.totalLinesOfCode}</div>
            <div className="text-l">Lines of Comments: {commentsPerCodeData.totalLinesOfComments}</div>
        </>
    ) : (
        <>
            <div>Comments Per Code Ratio</div>
            {commentsPerCodeData!==null && currRepo!==null 
            ? <div className="text-xl">{commentsPerCodeData.commentsPerCodeRatio}</div> 
            : <div className="text-xl">N/A</div>}
        </>
    )}
  </div>
  
  );
};

export default CommentsPerCodeRatio;