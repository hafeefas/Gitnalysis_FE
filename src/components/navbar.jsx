import React, { useEffect, useState }  from "react";
import { Link } from "react-router-dom";
import ChartLayout from "../layouts/ChartLayout";
import LoginForm from "./LoginForm";
import App from "../App";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutGitHubUser } from "../services/githubLogin";
import GitHubLogo from "../icons/github-logo.png";
import LoginButton from "./LoginButton";
import { useSelector } from 'react-redux'
import axios from "axios";
import { RxAvatar } from 'react-icons/rx';





function Navbar() {
  const currRepo = useSelector((state) => state.repo.currRepo)
  const username = useSelector((state) => state.user.username);
  const [user,setUser] = useState()
  
  // const repoParts = currRepo?.split("/");
        // const repo = repoParts[1]; 

  useEffect(() => {
    async function fetchUsers() {
      try {
       
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/me/`,
          {},
          { withCredentials: true }
        );
        setUser(response.data);
        console.log(response, "NAVBAR REPO LOG")
      } catch (error) {
        console.error("Error fetching collaborators:", error);
      }
    }

        fetchUsers();
    }, [currRepo]);


  // currRepo[0].owner.avatar_url
  console.log("LOGS " + currRepo);
  

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
      <div className="flex relative dark:bg-main-dark-bg " >

        <div
          className="p-2 fixed right-4 top-4 hover:drop-shadow-xl"
          style={{ zIndex: "1000" }}>
          <LoginButton />
        </div>

        

        <div
          className={
            activeMenu ? "h-full md:ml-72 w-full" : "h-full w-full flex-2 "
          }
        >
         
            <div
              className= "flex fixed md:static bg-main-bg navbar w-full text-left border-b border-gray-300 pt-5 pb-5 pl-3 bg-gradient-to-br from-slate-300 to-slate-600"
            >
            {username
            ? <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src={user?.avatar_url} alt={user?.name + " avatar"}/> 
            : <div className="p-2 flex gap-2 items-center">
                <RxAvatar style={{fontSize: "2.2rem", marginRight: "0.2rem", display: "flex", alignItems: "center"}}/>
                <span className="text-2xl">Guest</span>
              </div> }
            {currRepo
            ? <h1 className="p-2 font-medium font-sans-serif text-2xl hover:text-white ">{currRepo}</h1>
            :<div className="p-2 text-xl"></div>
            }

            </div>
            
        </div>
      </div>
    </div>
  );
}

export default Navbar;
