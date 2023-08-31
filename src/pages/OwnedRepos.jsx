import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentRepo } from "../redux/slices/repoSlice";
import { getUserRepos, getNonForkedRepos } from "../redux/slices/repoSlice";
import { useMediaQuery } from "@mui/material";
import { VscRepo } from "react-icons/vsc";
import { motion } from "framer-motion";

const OwnedRepos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allRepos = useSelector((state) => state.repo.allRepos);
  const nonForkedRepos = useSelector((state) => state.repo?.nonForkedRepos);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  const [searchQuery, setSearchQuery] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [showDropdown, setShowDropdown] = useState(false); // Track the visibility of the dropdown

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchQuery(inputValue);
    setShowDropdown(inputValue !== ""); // Set showDropdown to true only when input is not empty
  };

  const handleDropdownItemClick = (repoName) => {
    setSearchQuery(repoName);
    setShowDropdown(false); // Hide the dropdown after selecting an item
    handleClickRepo(repoName); // Trigger the action when an item is clicked
  };

  //find all repos owned by the user
  const ownerRepos = nonForkedRepos?.filter(
    (repo) => repo.owner.login === loggedInUser.login
  );
  // console.log(ownerRepos, "is owner repios null ");

  const sortedOwnerRepos = ownerRepos?.slice().sort((repo1, repo2) => {
    const name1 = repo1.name.toLowerCase();
    const name2 = repo2.name.toLowerCase();

    if (name1 < name2) {
      return -1;
    }
    if (name1 > name2) {
      return 1;
    }
    return 0;
  });

  const filteredRepos = sortedOwnerRepos?.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //show dashboard for a particular repo
  const handleClickRepo = (repoName) => {
    // setCurrRepo(repoName);
    dispatch(setCurrentRepo(repoName));
    // console.log(repoName, "clicked repo");
    navigate("/");
  };

  useEffect(() => {
    const fetchUserRepos = async () => {
      try {
        await dispatch(getNonForkedRepos());
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };
    fetchUserRepos();
  }, []);

  // if (allRepos) {
  //   console.log(allRepos);
  // }

  // Check if loggedInUser is available
  if (!loggedInUser) {
    return <div>Please log in to view the repos that you own!</div>; // or render some loading indicator
  }

  return (
    <div className="mt-12 flex-col flex justify-center items-center p-4">
      <div
        className="mt-8 duration-300 w-96 border shadow-xl rounded-md p-4 py-6 px-4 my-2 mb-2 border-black flex-col justify-center items-center"
        style={{ backgroundColor: "#171C2Eff" }}
      >
        <div className="flex h-fit text-4xl text-white font-serif p-4 justify-center rounded-lg shadow-lg  items-center border-black">
          <h1>Your Repos</h1>
          <div className="ml-4">
            <VscRepo style={{ color: "green" }} />
          </div>
        </div>
        <div
          className="grid justify-items-center"
          style={{ backgroundColor: "#171C2Eff" }}
        >
          <input
            type="text"
            placeholder="Search for forked repos..."
            className="mb-4 mt-8 py-2 px-4 border border-black rounded-md text-gray-900 bg-white border-gray-200 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-lg"
            style={{ width: "300px" }}
            value={searchQuery}
            onChange={handleInputChange}
          />
          {showDropdown && (
            <motion.ul
              variants={{
                hidden: { opacity: 0, x: -80 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.25 }}
              className="h-fit w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              style={{ backgroundColor: "#171C2Eff" }}
            >
              {filteredRepos.length > 0 ? (
                filteredRepos.map((repoName) => (
                  <motion.li
                    variants={{
                      hidden: { opacity: 0, x: 80 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.8, delay: 0.5 }}
                    key={repoName.full_name}
                    onClick={() => handleDropdownItemClick(repoName.full_name)}
                    className="w-48 rounded-lg py-2 pl-4 border-b border-gray-200 dark:border-gray-600 inline-block items-center text-white hover:bg-gradient-to-br from-teal-300 hover:to-sky-500 hover:text-black"
                  >
                    {repoName.name}
                  </motion.li>
                ))
              ) : (
                <li className="w-48 rounded-lg py-2 pl-4 border-b border-gray-200 dark:border-gray-600 inline-block items-center text-white bg-gradient-to-br from-red-300 to-red-900">
                  No Results
                </li>
              )}
            </motion.ul>
          )}
        </div>
      </div>
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -80 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.75 }}
        className="mt-10"
        style={{ backgroundColor: "#171C2Eff" }}
      >
        <ul
          className="h-fit ml-5 mr-5 w-fit text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white "
          style={{ backgroundColor: "#171C2Eff" }}
        >
          {sortedOwnerRepos?.map((repo) => (
            <li
              key={repo.full_name}
              onClick={() => handleClickRepo(repo.full_name)}
              className="w-full rounded-lg py-2 pl-4 border-b border-gray-200 dark:border-gray-600 inline-block items-center text-white hover:bg-gradient-to-br from-lime-400 to-green-500 hover:text-black"
            >
              {repo.name}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default OwnedRepos;
