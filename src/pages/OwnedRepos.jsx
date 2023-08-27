import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentRepo } from "../redux/slices/repoSlice";
import { getUserRepos, getNonForkedRepos } from "../redux/slices/repoSlice";
import { useMediaQuery } from "@mui/material";
import { VscRepo } from "react-icons/vsc";

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
  console.log(ownerRepos, "is owner repios null ");

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

  if (allRepos) {
    console.log(allRepos);
  }

  // Check if loggedInUser is available
  if (!loggedInUser) {
    return <div>Please log in to view the repos that you own!</div>; // or render some loading indicator
  }

  return (
    <div>
      <div className="flex text-3xl text-white p-5 justify-center items-center ">
        {/* <div className="mr-4">
          <VscRepo style={{ color: "green" }} />{" "}
        </div> */}

        <div>Your Repos</div>

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
          <ul
            className="h-16 w-64 overflow-y-scroll text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white "
            style={{ backgroundColor: "#171C2Eff" }}
          >
            {filteredRepos.length > 0 ? (
              filteredRepos.map((repoName) => (
                <li
                  key={repoName.full_name}
                  onClick={() => handleDropdownItemClick(repoName.full_name)}
                  className="w-full rounded-lg py-2 pl-4 border-b border-gray-200 dark:border-gray-600 inline-block items-center text-white hover:bg-gradient-to-br from-teal-300
                    hover:to-sky-500 hover:text-black"
                >
                  {repoName.name}
                </li>
              ))
            ) : (
              <li className="w-full rounded-lg py-2 pl-4 border-b border-gray-200 dark:border-gray-600 inline-block items-center text-white bg-gradient-to-br from-red-300 to-red-900">
                No Results
              </li>
            )}
          </ul>
        )}

        <div className="mt-10" style={{ backgroundColor: "#171C2Eff" }}>
          <ul
            className="h-full ml-5 mr-5 w-fit text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white "
            style={{ backgroundColor: "#171C2Eff" }}
          >
            {sortedOwnerRepos?.map((repo) => (
              <li
                key={repo.full_name}
                onClick={() => handleClickRepo(repo.full_name)}
                className="w-1/3 py-2 pl-4 border-b border-gray-200 dark:border-gray-600 inline-block items-center text-white hover:bg-gradient-to-br from-lime-400 to-green-500 hover:text-black"
              >
                {repo.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OwnedRepos;
