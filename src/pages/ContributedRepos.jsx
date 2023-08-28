import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setCurrentRepo } from "../redux/slices/repoSlice";
import { useNavigate } from "react-router-dom";
import { VscRepo, VscGitPullRequest } from "react-icons/vsc";


function ContributedRepos() {
    const [contributedReposSearchQuery, setContributedReposSearchQuery] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allRepos = useSelector((state) => state.repo.allRepos);
    const forkedRepos = useSelector((state) => state.repo.forkedRepos);
    const nonForkedRepos = useSelector((state) => state.repo?.nonForkedRepos);
    const starredRepos = useSelector((state) => state.repo?.starredRepos);
    const loggedInUser = useSelector((state) => state.user.loggedInUser);

    const contributedRepos = allRepos?.filter(
        (repo) => repo.owner.login !== loggedInUser.login
    );

    // contributedRepos search
    const sortedContributedReposSearch = contributedRepos.filter((repo) =>
        repo.name.toLowerCase().includes(contributedReposSearchQuery.toLowerCase())
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

    console.log("hello");

    console.log(contributedRepos);

    //show dashboard for a particular repo
    const handleClickRepo = (repoName) => {
        // setCurrRepo(repoName);
        dispatch(setCurrentRepo(repoName));
        // console.log(repoName, "clicked repo");
        navigate("/");
    };

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

    console.log(contributedRepos, "contributed repos")


    return (
        <div className='text-white'>
            <div className="flex text-3xl text-white p-5 justify-center items-center">

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
            <p className="text-white text-sm mb-2 ml-1">
                {" "}
                *Please be sure to only search by the name of the repo, not the owner{" "}
            </p>

            <div style={{ backgroundColor: "#171C2Eff" }}>
                <ul
                    className="ml-4 h-full w-fit text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white "
                    style={{ backgroundColor: "#171C2Eff" }}
                >
                    {sortedContributedReposSearch.map((repoName) => (
                        <li
                            key={repoName.full_name}
                            onClick={() => handleClickRepo(repoName.full_name)}
                            className="cursor-pointer w-1/3 py-2 pl-4 border-b border-gray-200 dark:border-gray-600 inline-block items-center text-white hover:bg-gradient-to-br from-pink-500 hover:to-purple-500 hover:text-black"
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
    )
}

export default ContributedRepos