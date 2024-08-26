import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentRepo } from "../redux/slices/repoSlice";
import { useNavigate } from "react-router-dom";
import { VscRepo, VscGitPullRequest } from "react-icons/vsc";
import CategoriesDropdown from "../components/CategoriesDropdown";
import { getUserRepos } from "../redux/slices/repoSlice";
import { motion } from "framer-motion";

function ContributedRepos() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); //passing as prop to categoriesdropdown
  const [showDropdown, setShowDropdown] = useState(false); // Track the visibility of the dropdown

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allRepos = useSelector((state) => state.repo.allRepos);
  const starredRepos = useSelector((state) => state.repo?.starredRepos);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

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

  const contributedRepos = allRepos?.filter(
    (repo) => repo.owner.login !== loggedInUser.data.login
  );

  //remove all starred repoes from contributed repos
  if (contributedRepos) {
    for (let i = 0; i < contributedRepos.length; i++) {
      let repoIndex = starredRepos?.findIndex(
        (repo) => repo.name === contributedRepos[i].name
      );
      contributedRepos.splice(repoIndex, 1);
    }
  }
  let sortedContributedRepos = [];
  //sort all the contributed repos
  if (contributedRepos) {
    //sort the forked repos
    sortedContributedRepos = contributedRepos?.slice().sort((repo1, repo2) => {
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

  const filteredRepos = sortedContributedRepos?.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //show dashboard for a particular repo
  const handleClickRepo = (repoName) => {
    // setCurrRepo(repoName);
    dispatch(setCurrentRepo(repoName));
    // console.log(repoName, "clicked repo");
    navigate("/dashboard");
  };
  // if (allRepos) {
  //   console.log(allRepos);
  // }
  // if (sortedContributedRepos) {
  //   console.log(sortedContributedRepos, "contributed repos");
  // }

  useEffect(() => {
    const fetchUserRepos = async () => {
      // console.log("getting user repos");
      try {
        await dispatch(getUserRepos());
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };
    fetchUserRepos();
  }, []);

  // Check if loggedInUser is available
  if (!loggedInUser) {
    return (
      <div className="flex justify-center items-center text-white text-2xl">
        Please log in to view the repos that you own!
      </div>
    ); // or render some loading indicator
  }

  return (
    <div className="grid w-full overflow-scroll mt-12 items-center p-4 mb-20">
      <div className="flex justify-center p-4 overflow-scroll ">
        <div
          className="flex mt-8 duration-300 w-screen border shadow-xl rounded-md p-4 py-6 px-4 my-2 mb-2 border-black flex-col justify-center items-center"
          style={{ backgroundColor: "#171C2Eff" }}
        >
          <div className="flex text-4xl text-white font-serif p-4 justify-center rounded-lg shadow-lg text-center items-center border-black">
            <h2>Other Repos You've Contributed To</h2>
            <div className="ml-4">
              <VscGitPullRequest style={{ color: "#cb9ac4ff" }} />
            </div>
          </div>
          <div
            className="grid justify-items-center"
            style={{ backgroundColor: "#171C2Eff" }}
          >
            <input
              type="text"
              placeholder="Search for other repos..."
              className="mb-4 mt-8 py-2 px-4 border border-black rounded-md text-gray-900 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-lg"
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
                className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                      onClick={() =>
                        handleDropdownItemClick(repoName.full_name)
                      }
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
      </div>

      <div className="flex justify-center">
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
            className="h-fit ml-5 mr-5 w-fit text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            style={{ backgroundColor: "#171C2Eff" }}
          >
            {sortedContributedRepos?.map((repo, index) => {
              {
                /* if (index % 2 !== 0) { */
              }
              return (
                <li
                  key={repo.full_name}
                  onClick={() => handleClickRepo(repo.full_name)}
                  className="w-full rounded-lg py-2 pl-4 border-b border-gray-200 dark:border-gray-600 inline-block items-center text-white hover:bg-gradient-to-br from-lime-400 to-green-500 hover:text-black"
                >
                  <div className="flex">
                    <img
                      src={repo.owner.avatar_url}
                      className="h-8 w-8"
                      alt="Avatar"
                    />
                    <div className="">
                      <div className="flex flex-col ml-4">{repo.name}</div>
                      <div className="flex flex-col ml-4">
                        Owner: {repo.owner?.login}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default ContributedRepos;
