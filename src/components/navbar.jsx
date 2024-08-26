import React, { useEffect, useState } from "react";
import LoginButton from "./LoginButton";
import { useSelector } from "react-redux";
import axios from "axios";
import { RxAvatar } from "react-icons/rx";
import { useMediaQuery } from "@mui/material";

function Navbar() {
  const currRepo = useSelector((state) => state.repo.currRepo);
  const username = useSelector((state) => state.user.username);
  const userRedux = useSelector(
    (state) => state.user.loggedInUser?.data?.login
  );
  const userProfilePhoto = useSelector(
    (state) => state.user.loggedInUser?.data?.avatar_url
  );
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [user, setUser] = useState();
  const isTabletScreen = useMediaQuery("(max-width: 770px)");
  const isMobileScreen = useMediaQuery("(max-width: 470px)");
  const [userName, setUserName] = useState("");
  const [repo, setRepo] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  // console.log(username, " from navbar");

  // console.log(userRedux, "loggin in user from navbar");

  useEffect(() => {
    if (currRepo && currRepo.includes("/")) {
      const repoParts = currRepo.split("/");
      setUserName(repoParts[0]);
      setRepo(repoParts[1]);
      // console.log(userRedux, " user redux");
      // console.log(user);
    }
  }, [currRepo, username, userRedux, isLoggedIn]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/me/`,
          { withCredentials: true }
        );
        setUser(response.data.data);
        // console.log(userRedux, "logged in user");
        // console.log(response.data.data.login);
        // console.log(response, "NAVBAR REPO LOG");
      } catch (error) {
        console.error("Error fetching collaborators:", error);
      }
    }

    if (currRepo) {
      fetchUsers();
      // console.log(userProfilePhoto, "avatar url");
    }
  }, [currRepo, username, isLoggedIn, userRedux]);

  const handleRepoLinkClick = () => {
    if (currRepo) {
      window.open(`https://github.com/${userName}/${repo}`, "_blank");
    } else {
      return;
    }
  };

  const activeMenu = false;

  // const handleLogoutUser = () => {
  //   logoutGitHubUser();
  // }

  // const handleLoginWithGitHubClick = () => {
  //   console.log('handled')
  //   window.open(`${process.env.REACT_APP_BACKEND_URL}/github/auth`, '_self')
  //   // window.open(`http://localhost:8080/github/auth`,'_self')
  // }

  return (
    <div>
      {isMobileScreen ? (
        <div className="flex flex-col relative dark:bg-main-dark-bg z-50">
          <div
            className="p-2 absolute right-1 hover:drop-shadow-xl"
            style={{ zIndex: "1000" }}
          >
            <LoginButton />
          </div>
          <div
            className={
              activeMenu ? "h-full md:ml-72 w-full" : "h-full w-full flex-2 "
            }
          >
            <div
              className="flex items-center fixed md:static bg-main-bg navbar w-full text-left border-b border-gray-300 pt-1 pb-1 pl-3 bg-gradient-to-br from-indigo-100 to-indigo-400 cursor-pointer"
              onClick={handleRepoLinkClick}
            >
              {username ? (
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white mr-4"
                  src={userProfilePhoto}
                  alt={user?.name + " avatar"}
                />
              ) : (
                <div className="flex gap-2 items-center">
                  <RxAvatar
                    style={{
                      fontSize: "2rem",
                      marginRight: "0.2rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  />
                  <span className="text-xl :text-mm">Guest</span>
                </div>
              )}
              {currRepo ? (
                <div>
                  <div className="lg:text-xl md:text-sm font-sans-serif hover:text-white ">
                    {userName}/
                  </div>
                  <div className="lg:text-xl md:text-sm font-sans-serif hover:text-white ">
                    {repo}
                  </div>
                </div>
              ) : user?.name ? (
                <div
                  className="lg:text-xl md:text-sm font-sans-serif hover:text-white "
                  style={{ cursor: "default" }}
                >
                  {user?.name}
                </div>
              ) : userRedux ? (
                <div
                  className="lg:text-xl md:text-sm font-sans-serif hover:text-white "
                  style={{ cursor: "default" }}
                >
                  {userRedux}
                </div>
              ) : (
                <div className="p-2 text-xl"></div>
              )}
            </div>
          </div>
        </div>
      ) : isTabletScreen ? (
        <div className="flex flex-col relative dark:bg-main-dark-bg z-50">
          <div
            className={`${
              isTabletScreen ? "ml-6" : "mr-20"
            } p-2 absolute top-1 right-4 hover:drop-shadow-xl`}
            style={{ zIndex: "1000" }}
          >
            <LoginButton />
          </div>
          <div
            className={
              activeMenu ? "h-full md:ml-72 w-full" : "h-full w-full flex-2 "
            }
          >
            <div
              className="flex items-center fixed md:static bg-main-bg navbar w-full text-left border-b border-gray-300 pt-4 pb-4 pl-3 bg-gradient-to-br from-indigo-100 to-indigo-400 cursor-pointer"
              onClick={handleRepoLinkClick}
            >
              {username ? (
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white mr-4"
                  src={userProfilePhoto}
                  alt={user?.name + " avatar"}
                />
              ) : (
                <div className="flex gap-2 items-center">
                  <RxAvatar
                    style={{
                      fontSize: "2rem",
                      marginRight: "0.2rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  />
                  <span className="text-xl :text-mm">Guest</span>
                </div>
              )}
              {currRepo ? (
                <div className="lg:text-xl md:text-sm font-sans-serif hover:text-white ">
                  {currRepo}
                </div>
              ) : user?.name ? (
                <div
                  className="lg:text-xl md:text-sm font-sans-serif hover:text-white "
                  style={{ cursor: "default" }}
                >
                  {user?.name}
                </div>
              ) : userRedux ? (
                <div
                  className="lg:text-xl md:text-sm font-sans-serif hover:text-white "
                  style={{ cursor: "default" }}
                >
                  {userRedux}
                </div>
              ) : (
                <div className="p-2 text-xl"></div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex relative dark:bg-main-dark-bg z-50">
          <div
            className="p-2 absolute mr-20 top-1 right-4 hover:drop-shadow-xl"
            style={{ zIndex: "1000" }}
          >
            <LoginButton />
          </div>

          <div
            className={
              activeMenu ? "h-full md:ml-72 w-full" : "h-full w-full flex-2 "
            }
          >
            <div
              className="flex items-center fixed md:static bg-main-bg navbar w-full text-left border-b border-gray-300 pt-4 pb-4 pl-3 bg-gradient-to-br from-indigo-100 to-indigo-400 cursor-pointer"
              onClick={handleRepoLinkClick}
            >
              {username ? (
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white mr-4"
                  src={userProfilePhoto}
                  alt={user?.name + " avatar"}
                />
              ) : (
                <div className="flex gap-2 items-center">
                  <RxAvatar
                    style={{
                      fontSize: "2rem",
                      marginRight: "0.2rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  />
                  <span className="text-xl">Guest</span>
                </div>
              )}
              {currRepo ? (
                <h1 className="font-medium font-sans-serif text-xl hover:text-white ">
                  {currRepo}
                </h1>
              ) : userRedux?.name ? (
                <div
                  className="font-medium font-sans-serif text-xl hover:text-white "
                  style={{ cursor: "default" }}
                >
                  {user?.name}
                </div>
              ) : userRedux ? (
                <div
                  className="font-medium font-sans-serif text-xl hover:text-white "
                  style={{ cursor: "default" }}
                >
                  {userRedux}
                </div>
              ) : (
                <div className="p-2 text-xl"></div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
