import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentRepo } from "../redux/slices/repoSlice";
import { getStarredRepos } from "../redux/slices/repoSlice";
import { useMediaQuery } from "@mui/material";
import { BsStars } from "react-icons/bs";
import { motion } from "framer-motion";

const StarredRepos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allRepos = useSelector((state) => state.repo.allRepos);
  const starredRepos = useSelector((state) => state.repo.starredRepos);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  const [searchQuery, setSearchQuery] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [showDropdown, setShowDropdown] = useState(false); // Track the visibility of the dropdown

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchQuery(inputValue);
    setShowDropdown(inputValue !== ""); // Set showDropdown to true only when input is not empty
    console.log(inputValue, "STARRED INPUT SEARCH");
  };

  const handleDropdownItemClick = (repoName) => {
    setSearchQuery(repoName);
    setShowDropdown(false); // Hide the dropdown after selecting an item
    handleClickRepo(repoName); // Trigger the action when an item is clicked
    console.log(repoName, "STARRED DROPDOWN REPO NAME");
  };

  //show dashboard for a particular repo
  const handleClickRepo = (repoName) => {
    console.log(repoName, "handling click repo");
    // setCurrRepo(repoName);
    dispatch(setCurrentRepo(repoName));
    console.log(repoName, "STARRED REPO NAME");
    // console.log(repoName, "clicked repo");
    navigate("/");
  };

  let sortedStarredRepos = [];
  // console.log(starredRepos, "STARRED");
  // sort the starred repos
  if (starredRepos) {
    console.log(starredRepos, "IF STARRED");
  }
  if (starredRepos) {
    console.log("sorting the starred!");
    sortedStarredRepos = [...starredRepos]?.sort((repo1, repo2) => {
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
  }

  console.log(sortedStarredRepos, "checking for starred repos");
  //   for search, filter through the starred repos
  const filterStarred = sortedStarredRepos?.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filterStarred) {
    console.log(filterStarred);
  }

  useEffect(() => {
    const fetchStarredRepos = async () => {
      try {
        await dispatch(getStarredRepos());
        console.log("getting the starred repos");
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };
    fetchStarredRepos();
  }, []);

  if (starredRepos) {
    console.log(starredRepos);
  }

  // Check if loggedInUser is available
  if (!loggedInUser) {
    return <div>Please log in to view the repos that you own!</div>; // or render some loading indicator
  }

  return (
    <div className="h-screen flex-col flex justify-center items-center p-4">
      <div
        className="duration-300 w-96 border shadow-xl rounded-md p-4 py-6 px-4 my-2 mb-2 border-black flex-col justify-center items-center"
        style={{ backgroundColor: "#171C2Eff" }}
      >
        <div className="flex h-fit text-4xl text-white font-serif p-4 justify-center rounded-lg shadow-lg  items-center border-black">
          <h1>Starred Repos</h1>
          <div className="ml-4">
            <BsStars style={{ color: "yellow" }} />
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
              {filterStarred.length > 0 ? (
                filterStarred.map((repoName) => (
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
                <li className="w-full rounded-lg py-2 pl-4 border-b border-gray-200 dark:border-gray-600 inline-block items-center text-white bg-gradient-to-br from-red-300 to-red-900">
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
          {sortedStarredRepos?.map((repo) => (
            <li
              key={repo.full_name}
              onClick={() => handleClickRepo(repo.full_name)}
              className="w-full rounded-lg py-2 pl-4 border-b border-gray-200 dark:border-gray-600 inline-block items-center text-white hover:bg-gradient-to-br from-pink-500 hover:to-yellow-500 hover:text-black"
            >
              {repo.name}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default StarredRepos;
