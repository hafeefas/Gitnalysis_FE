import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentRepo } from "../redux/slices/repoSlice";
import { BsStars } from "react-icons/bs";
import { FaCodeFork } from "react-icons/fa6";
import { VscRepo, VscGitPullRequest } from "react-icons/vsc";

const RepoList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allRepos = useSelector((state) => state.repo.allRepos);
  const forkedRepos = useSelector((state) => state.repo.forkedRepos);
  const nonForkedRepos = useSelector((state) => state.repo.nonForkedRepos);
  const starredRepos = useSelector((state) => state.repo?.starredRepos);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  const [searchQuery, setSearchQuery] = useState("");
  const [contributedReposSearchQuery, setContributedReposSearchQuery] = useState("");
  const [starredReposSearchQuery, setStarredReposSearchQuery] = useState("");
  const [forkedReposSearchQuery, setForkedReposSearchQuery] = useState("");
  const [githubLink, setGithubLink] = useState("")

  //find all repos owned by the user
  const ownerRepos = nonForkedRepos?.filter(
    (repo) => repo.owner.login === loggedInUser.login
  );
  console.log(ownerRepos, "is owner repios null ")

  // Check if loggedInUser is available
  if (!loggedInUser) {
    return <div>Loading...</div>; // or render some loading indicator
  }


  //for search, filter through the repositories based on the input
  const filteredRepos = ownerRepos.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );



  // console.log("console logging the forked repos", forkedRepos)

  // for search, filter through the forked repos
  const filterForked = forkedRepos.filter((repo) =>
    repo.name.toLowerCase().includes(forkedReposSearchQuery.toLowerCase())
  )
  // console.log(filterForked, "filtering fork")


  // console.log(filteredRepos, "im filtering the search")

  //handle input changes and update the searching query for filtered repos
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  //handle input change for forked repos
  const handleForkedReposInputChange = (event) => {
    setForkedReposSearchQuery(event.target.value);
  };


  //find repos not owned by logge in user that they contributed to
  const contributedRepos = allRepos?.filter(
    (repo) => repo.owner.login !== loggedInUser.login
  );

  // contributedRepos search
  const sortedContributedReposSearch = contributedRepos.filter((repo) =>
    repo.name.toLowerCase().includes(contributedReposSearchQuery.toLowerCase())
  );

  //remove all starred repoes from contributed repos
  if(contributedRepos){
  for (let i = 0; i < contributedRepos.length; i++) {
    let repoIndex = starredRepos?.findIndex(
      (repo) => repo.name === contributedRepos[i].name
    );
    contributedRepos.splice(repoIndex, 1);
  }
}

  console.log("hello");

  console.log(contributedRepos);

  let sortedForkedRepos = [];
  if (forkedRepos) {
    //sort the forked repos
    sortedForkedRepos = forkedRepos?.slice().sort((repo1, repo2) => {
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

  let sortedStarredRepos = [];
  // console.log(starredRepos, "STARRED");
  // sort the starred repos
  if (starredRepos) {
    sortedStarredRepos = [...starredRepos].sort((repo1, repo2) => {
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

  // console.log(sortedStarredRepos, "checking for starred repos")
  // for search, filter through the starred repos
  const filterStarred = sortedStarredRepos.filter((repo) =>
    repo.name.toLowerCase().includes(starredReposSearchQuery.toLowerCase())
  )

  const handleFilterStarred = (event) => {
    setStarredReposSearchQuery(event.target.value)
  }

  // console.log(sortedStarredRepos, "SORTED STARRED");

  //sort all the contributed repos
  const sortedContributedRepos = [...contributedRepos]?.sort((repo1, repo2) => {
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

  // console.log(sortedContributedRepos, "SORTED CONTRIBUTED");

  //sort all owned repos
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

  //show dashboard for a particular repo
  const handleClickRepo = (repoName) => {
    // setCurrRepo(repoName);
    dispatch(setCurrentRepo(repoName));
    // console.log(repoName, "clicked repo");
    navigate("/");
  };

  //open a new tab with the github repo
  // const handleOpenUrl = (cloneUrl) => {
  //   window.open(cloneUrl, "_blank");
  // };

  return (
    <div>
      <div className="flex text-3xl text-white p-5 justify-center items-center">
        {/* <div className="mr-4">
          <VscRepo style={{ color: "green" }} />{" "}
        </div> */}

        <div>Your Repos</div>

        <div className="ml-4">
          <VscRepo style={{ color: "green" }} />
        </div>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for repos..."
          className="p-2 w-full text-gray-900 bg-white border-gray-200 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ backgroundColor: "#171C2Eff" }}>
        <ul
          className="h-full w-fit text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white "
          style={{ backgroundColor: "#171C2Eff" }}
        >
          {/* had to replace the below commented code with this for search to work */}
          {filteredRepos.map((repo) => (
            <li
              key={repo.full_name}
              onClick={() => handleClickRepo(repo.full_name)}
              className="w-1/3 py-2 pl-4 border-b border-gray-200 dark:border-gray-600 inline-block items-center text-white hover:bg-gradient-to-br from-lime-400 to-green-500 hover:text-black"
            >
              {repo.name}
            </li>
          ))}
          {/* {sortedOwnerRepos?.map((repoName) => (
            <li
              key={repoName.full_name}
              onClick={() => handleClickRepo(repoName.full_name)}
              className="w-1/3 py-2 pl-4 border-b border-gray-200 dark:border-gray-600 inline-block items-center text-white hover:bg-gradient-to-br from-lime-400 to-green-500 hover:text-black"
            >
              {repoName.name}
            </li>
          ))} */}

        </ul>
      </div>
      <div className="flex text-3xl text-white p-5 justify-center items-center">
        {/* <div className="mr-4">
          <BsStars style={{ color: "yellow" }} />{" "}
        </div> */}
        <div> Starred Repos </div>
        <div className="ml-4">
          <BsStars style={{ color: "yellow" }} />
        </div>
      </div>
      <input
        type="text"
        placeholder="Search for starred repos..."
        className="p-2 w-full text-gray-900 bg-white border-gray-200 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        value={starredReposSearchQuery}
        onChange={handleFilterStarred}
      />
      <div style={{ backgroundColor: "#171C2Eff" }}>
        <ul
          className="h-full w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white "
          style={{ backgroundColor: "#171C2Eff" }}
        >


          {filterStarred?.map((repoName) => (
            <li
              key={repoName.full_name}
              onClick={() => handleClickRepo(repoName.full_name)}
              className="w-1/3 py-2 pl-4 border-b border-gray-200 dark:border-gray-600 inline-block items-center text-white hover:bg-gradient-to-br from-pink-500 hover:to-yellow-500 hover:text-black"
            >
              <div className="flex items-center">
                <img src={repoName.ownerAvatarUrl} className="h-8 w-8" />{" "}
                <div className="flex flex-col ml-4">
                  <div>{repoName.name}</div>
                  <div>Owner: {repoName.owner?.login}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex text-3xl text-white p-5 justify-center items-center">
        {/* <div className="mr-4">
          <FaCodeFork style={{ color: "gray" }} />{" "}
        </div> */}
        <div>Forked Repos</div>
        <div className="ml-4">
          <FaCodeFork style={{ color: "gray" }} />
        </div>
      </div>
      <div style={{ backgroundColor: "#171C2Eff" }}>
        <input
          type="text"
          placeholder="Search for forked repos..."
          className="p-2 w-full text-gray-900 bg-white border-gray-200 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={forkedReposSearchQuery}
          onChange={handleForkedReposInputChange}
        />
        <ul
          className="h-full w-fit text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white "
          style={{ backgroundColor: "#171C2Eff" }}
        >

          {filterForked?.map((repoName) => (
            <li
              key={repoName.full_name}
              onClick={() => handleClickRepo(repoName.full_name)}
              className="w-1/3 py-2 pl-4 border-b border-gray-200 dark:border-gray-600 inline-block items-center text-white hover:bg-gradient-to-br from-teal-300
              hover:to-sky-500 hover:text-black"
            >
              {repoName.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex text-3xl text-white p-5 justify-center items-center">
        {/* <div className="mr-4">
          <VscGitPullRequest style={{ color: "#cb9ac4ff" }} />{" "}
        </div> */}

        <div>Other Repos You've Contributed To</div>
        <div className="ml-4">
          <VscGitPullRequest style={{ color: "#cb9ac4ff" }} />
        </div>
      </div>
      <input
        type="text"
        placeholder="Search for contributed repos..."
        className="mb-2 p-2 w-full text-gray-900 bg-white border-gray-200 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        value={contributedReposSearchQuery}
        onChange={(event) => setContributedReposSearchQuery(event.target.value)}
      />
      <p className="text-white text-sm mb-2"> *Please be sure to only search by the name of the repo, not the owner </p>

      <div style={{ backgroundColor: "#171C2Eff" }}>
        <ul
          className="h-full w-fit text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white "
          style={{ backgroundColor: "#171C2Eff" }}
        >
  
          {sortedContributedReposSearch.map((repoName) => (
            <li
              key={repoName.full_name}
              onClick={() => handleClickRepo(repoName.full_name)}
              className="w-1/3 py-2 pl-4 border-b border-gray-200 dark:border-gray-600 inline-block items-center text-white hover:bg-gradient-to-br from-pink-500 hover:to-purple-500 hover:text-black"
            >
              <div className="flex items-center">
                <img src={repoName.owner.avatar_url} className="h-8 w-8" />{" "}
                <div className="flex flex-col ml-4">
                  <div>{repoName.name}</div>
                  <div>Owner: {repoName.owner?.login}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RepoList;
