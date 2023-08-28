import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentRepo } from "../redux/slices/repoSlice";
import { FaCodeFork } from "react-icons/fa6";
import { useMediaQuery } from "@mui/material";
import { getForkedRepos } from "../redux/slices/repoSlice";


const ForkedRepos = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const forkedRepos = useSelector((state) => state.repo.forkedRepos);
    const nonForkedRepos = useSelector((state) => state.repo.nonForkedRepos);
    const loggedInUser = useSelector((state) => state.user.loggedInUser);
    const allRepos = useSelector((state) => state.repo.allRepos);

 
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [forkedReposSearchQuery, setForkedReposSearchQuery] = useState("");
    const [githubLink, setGithubLink] = useState("")
    const isTabletScreen = useMediaQuery("(max-width: 770px)");
    const isMobileScreen = useMediaQuery("(max-width: 420px)");

    const ownerRepos = nonForkedRepos?.filter(
        (repo) => repo.owner.login === loggedInUser.login
      );
      console.log(ownerRepos, "is owner repios null ")

   
     //for search, filter through the repositories based on the input
    const filteredRepos = ownerRepos.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(filteredRepos)


    console.log("console logging the forked repos", forkedRepos)

    // for search, filter through the forked repos
    const filterForked = forkedRepos.filter((repo) =>
    repo.name.toLowerCase().includes(forkedReposSearchQuery.toLowerCase())
    )
        //console.log(filterForked, "filtering fork")
        //handle input changes and update the searching query for filtered repos
    

    //handle input change for forked repos
    const handleForkedReposInputChange = (event) => {
        setForkedReposSearchQuery(event.target.value);
    };
    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setSearchQuery(inputValue);
        setShowDropdown(inputValue !== ""); // Set showDropdown to true only when input is not empty
        console.log(inputValue, "FORKEDREPOS INPUT SEARCH");
      };
    
      const handleDropdownItemClick = (repoName) => {
        setSearchQuery(repoName);
        setShowDropdown(false); // Hide the dropdown after selecting an item
        handleClickRepo(repoName); // Trigger the action when an item is clicked
        console.log(repoName, "FORKEDREPOS DROPDOWN REPO NAME");
      };
    

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
        //show dashboard for a particular repo
    const handleClickRepo = (repoName) => {
        // setCurrRepo(repoName);
        dispatch(setCurrentRepo(repoName));
        // console.log(repoName, "clicked repo");
        navigate("/");
    };
    console.log(forkedRepos, "FORKEDD")


    

    useEffect(() => {
        const fetchForkedRepos = async () => {
        try {            
            await dispatch(getForkedRepos());
        } catch (error) {
            console.error("Error fetching repos:", error);
        }
        };
        fetchForkedRepos();
    }, [dispatch]);
        // Check if loggedInUser is available
        if (!loggedInUser) {
            return <div>Loading...</div>; // or render some loading indicator
        }

    return(
        <div className="flex justify-center items-center p-4">
            <div className="w-96 border shadow-xl rounded-md p-4 py-6 px-4 my-2 mb-2 border-black flex-col justify-center items-center"
                style={{ backgroundColor: "#171C2Eff" }}>
                <div className="flex h-fit text-4xl text-white font-serif p-4 justify-center rounded-lg shadow-lg  items-center border-black">
                    <h1>Forked Repos</h1>
                    <div className="ml-4">
                        <FaCodeFork style={{ color: "gray" }} />
                    </div>
                </div>
                <div className="flex justify-center items-center" style={{ backgroundColor: "#171C2Eff" }}>
                    <input
                        type="text"
                        placeholder="Search for forked repos..."
                        className="mb-4 py-2 px-4 border border-black rounded-md text-gray-900 bg-white border-gray-200 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-lg"
                        style={{ width: "300px" }}
                        value={forkedReposSearchQuery}
                        onChange={handleForkedReposInputChange}
                    />{showDropdown && (
                        <ul
                          className="h-16 w-64 overflow-y-scroll text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white "
                          style={{ backgroundColor: "#171C2Eff" }}
                        >
                          {filterForked.length > 0 ? (
                    filterForked.map((repoName) => (
                        <li
                        key={repoName.full_name}
                        onClick={() => handleDropdownItemClick(repoName.full_name)}
                        className="w-full rounded-lg py-2 pl-4 border-b border-gray-200 dark:border-gray-600 inline-block items-center text-white hover:bg-gradient-to-br from-teal-300 hover:to-sky-500 hover:text-black"
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
                </div>
                <ul className="h-fit w-fit text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" style={{ backgroundColor: "#171C2Eff" }}>
                    {filterForked?.map((repoName) => (
                        <li
                            key={repoName.full_name}
                            onClick={() => handleClickRepo(repoName.full_name)}
                            className="w-full rounded-lg py-2 pl-4 border-b border-gray-200 dark:border-gray-600 inline-block items-center text-white hover:bg-gradient-to-br from-teal-300 hover:to-sky-500 hover:text-black">
                            {repoName.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
    )
}
export default ForkedRepos;