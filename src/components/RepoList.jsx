import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentRepo } from "../redux/slices/repoSlice";

const RepoList = () => {
  const dispatch = useDispatch();
  const allRepos = useSelector((state) => state.repo.allRepos);
  const navigate = useNavigate();

  const handleClickRepo = (repoName) => {
    // setCurrRepo(repoName);
    dispatch(setCurrentRepo(repoName));
    console.log(repoName, "clicked repo");
    navigate("/");
  };

  return (
    <div
      className="h-full overflow-x-scroll"
      style={{ backgroundColor: "#171C2Eff" }}
    >
      <ul
        className="h-full w-fit text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white "
        style={{ backgroundColor: "#171C2Eff" }}
      >
        {allRepos?.map((repoName) => (
          <li
            key={repoName.full_name}
            onClick={() => handleClickRepo(repoName.full_name)}
            className="w-1/3 px-4 py-2 border-b border-gray-200 dark:border-gray-600 inline-block text-white hover:bg-gradient-to-br from-teal-300 hover:to-sky-500 hover:text-black"
          >
            {repoName.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
