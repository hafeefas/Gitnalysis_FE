import React from "react";
import { useDispatch, useSelector } from "react-redux";
import GitHubLogo from "../icons/github-logo.png";
import { logoutGitHubUser } from "../services/githubLogin";
import {
  authLogIn,
  setAuthenticated,
  toggleLoggedIn,
} from "../redux/slices/userSlice";
import { resetRepos, resetCurrRepo } from "../redux/slices/repoSlice";
import { setUsername } from "../redux/slices/userSlice";

import { BsGithub } from "react-icons/bs";
import { useMediaQuery } from "@mui/material";

//BsGithub

const LoginButton = () => {
  //   const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  //   const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const isTabletScreen = useMediaQuery("(max-width: 770px)");

  const handleLogoutUser = () => {
    console.log("logging out");
    logoutGitHubUser();
    //clear the repos, the current repo, reset everything -> this isn't working yet tho
    dispatch(resetRepos());
    dispatch(resetCurrRepo());
    dispatch(toggleLoggedIn());
    dispatch(setAuthenticated(false));
    dispatch(setUsername(null));
  };

  const handleLoginWithGitHubClick = async () => {
    try {
      await dispatch(authLogIn()); // Dispatch the authLogIn action and wait for it to complete
      openGitHubAuthenticationWindow();
    } catch (error) {
      setAuthenticated(false);
      console.error("Error dispatching authLogIn:", error);
    }
  };

  const openGitHubAuthenticationWindow = () => {
    const authenticationWindow = window.open(
      `${process.env.REACT_APP_BACKEND_URL}/github/auth`,
      "_self"
    );

    // Add an event listener to check if the window has been closed
    const checkWindowClosed = setInterval(() => {
      if (authenticationWindow.closed) {
        clearInterval(checkWindowClosed); // Clear the interval when the window is closed
        updateReduxOnAuthentication(); // Update Redux store when authentication is complete
      }
    }, 1000); // Check every second
  };

  const updateReduxOnAuthentication = () => {
    dispatch(setAuthenticated(true));
  };

  return (
    <div className="flex justify-center items-center">
      {username ? (
        <button
          className={`${
            isTabletScreen ? "w-24" : "w-48"
          } flex justify-center items-center bg-gray-800 hover:bg-gray-900 text-white py-2 rounded focus:outline-none font-sans-serif font-medium`}
          type="button"
          onClick={handleLogoutUser}
        >
          <BsGithub className="hover:text-white  text-xl mr-2 text-slate-400 hover:text-white" />
          {/* <img src={GitHubLogo} alt="GitHub Logo" className="h-5 w-5 mr-2" />{" "} */}
          Logout
        </button>
      ) : (
        <button
          className="w-48 flex justify-center items-center bg-gray-800 hover:bg-gray-900 text-white py-2 rounded focus:outline-none"
          type="button"
          onClick={handleLoginWithGitHubClick}
        >
          <img src={GitHubLogo} alt="GitHub Logo" className="h-5 w-5 mr-2 " />{" "}
          Login with GitHub
        </button>
      )}
    </div>
  );
};

export default LoginButton;
