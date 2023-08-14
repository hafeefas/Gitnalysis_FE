import React from 'react';
import { Link } from 'react-router-dom';
import ChartLayout from '../layouts/ChartLayout';
import LoginForm from './LoginForm';
import App from '../App';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutGitHubUser } from '../services/githubLogin';

function Navbar() {
  const activeMenu = false;

  const handleLogoutUser = () => {
    logoutGitHubUser();
  }

  return (

    <div className="">
      <div className='flex relative dark:bg-main-dark-bg'>
        <div className='fixed right-4 top-4 hover:drop-shadow-xl' style={{ zIndex: "1000" }}>
          <Link to="/login">
          <button type="button" onClick={handleLogoutUser}>
            <LogoutIcon className="text-3xl hover:drop-shadow-xl hover:bg-light-gray text-purple-700" />
          </button>
          </Link>
        </div>

        <div className={activeMenu ? "h-full md:ml-72 w-full" : "h-full w-full flex-2 "}>
          <div className='flex'>
            <div className='fixed md:static bg-main-bg navbar w-full text-left border-b border-gray-300 pt-5 pb-5 pl-3' style={{backgroundColor:"#d0d0d0"}}>
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