import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import axios from "axios";

const RepoSearch = ({ link }) => {
  const [githubLink, setGithubLink] = useState({});
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const isMobileScreen = useMediaQuery("(max-width: 420px)");
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const backgroundColor = hovered ? "#f3502b" : "#f3502aff";

  const ownerRepo = () => {
    if (link !== undefined || link !== "") {
      setOwner(link.split("/")[3]);
      setRepo(link.split("/")[4]);
    }
  };

  console.log("ownerrepo for later", ownerRepo);

  /// https://github.com/segfal/karaoke-backend Are we passing this link?
  /// how do we split this url?

  useEffect(() => {
    async function getRepoSearch(ownerRepo) {
      try {
        if (owner.length > 0 && repo.length > 0) {
          const res = axios.get(
            `https://api.github.com/repos/${owner}/${repo}`
          ); ///HELLO
          console.log(res, "res for search bar link");
          setGithubLink(res.data);
        }
      } catch (error) {
        console.log(error, "error from getting repository");
      }
    }
    getRepoSearch();
  }, []);

  return (
    <div className={isMobileScreen ? "w-72" : "w-4/5"}>
      {isMobileScreen ? (
        <div>
          <form className="flex flex-col h-full">
            <div className="flex-grow flex flex-col">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white "
              >
                Search
              </label>
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  {/* SVG icon */}
                </div>
                <input
                  type="search"
                  id="default-search"
                  className={`block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2 ${
                    isMobileScreen ? "" : "pl-10"
                  }`}
                  placeholder={
                    isMobileScreen
                      ? "Input your repo link... "
                      : "Input your repo link here..."
                  }
                  required
                />
              </div>
            </div>
            <Link to="/">
              <button
                type="submit"
                className="text-white w-72 border justify-center border-pink-500 hover:bg-orange-600 hover:text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex items-center justify-center"
              >
                <div className="text-bold w-fit">Search</div>
              </button>
            </Link>
          </form>
        </div>
      ) : (
        <>
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={
                  isMobileScreen
                    ? "Input your repo link... "
                    : "Input your repo link here..."
                }
                required
              />
              <Link to="/">
                <button
                  type="submit"
                  className="text-white absolute border border-pink-500 hover:bg-orange-600 right-2.5 bottom-2.5 bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-4 py-2 ease-linear
                  transition-all duration-150 flex items-center justify-center"
                >
                  {/* className="text-white w-72 border justify-center
                  border-pink-500 hover:bg-orange-600 hover:text-white
                  active:bg-pink-600 font-bold uppercase text-xs px-4 py-2
                  rounded outline-none focus:outline-none mr-1 mb-1 ease-linear
                  transition-all duration-150 flex items-center justify-center" */}
                  <div>Search</div>
                </button>
              </Link>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default RepoSearch;
