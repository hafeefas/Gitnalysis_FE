import React from "react";
import { Link } from "react-router-dom";
import ChartLayout from "../layouts/ChartLayout";
import LoginForm from "./LoginForm";
import App from "../App";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutGitHubUser } from "../services/githubLogin";
import GitHubLogo from "../icons/github-logo.png";
import LoginButton from "./LoginButton";

function Navbar() {
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
    <div className="">
      <div className="flex relative dark:bg-main-dark-bg">
        <div
          className="fixed right-4 top-4 hover:drop-shadow-xl"
          style={{ zIndex: "1000" }}
        >
          {/* <div className='flex justify-center items-center'>
            <button className="w-48 flex justify-center items-center bg-gray-800 hover:bg-gray-900 text-white py-2 rounded focus:outline-none" type='button' onClick={handleLoginWithGitHubClick}>
              <img src={GitHubLogo} alt="GitHub Logo" className="h-5 w-5 mr-2" /> Login with GitHub
            </button>
          </div> */}
          <LoginButton />
          {/* <Link to="/login">
          <button type="button" onClick={handleLogoutUser}> */}
          {/* <button type="button" > */}
          {/* <LogoutIcon className="text-3xl hover:drop-shadow-xl hover:bg-light-gray text-purple-700" />
          </button>
          </Link> */}
        </div>

        <div
          className={
            activeMenu ? "h-full md:ml-72 w-full" : "h-full w-full flex-2 "
          }
        >
          <div className="flex">
            <div
              className="fixed md:static bg-main-bg navbar w-full text-left border-b border-gray-300 pt-5 pb-5 pl-3"
              style={{ backgroundColor: "#d0d0d0" }}
            >
              repository statistics
              {/* <nav>
                <ul>
                    <li>
                    <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                    <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav> */}
            </div>
          </div>
          <div className="flex-grow">
            {/* Add navigation buttons for tabs */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
