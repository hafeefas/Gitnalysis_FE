import React from 'react';
import { Link } from 'react-router-dom';
import ChartLayout from '../layouts/ChartLayout';
import LoginForm from './LoginForm';
import App from '../App';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
  const activeMenu = false;

  return (

    <div className="bg-gray-500">
      <div className='flex relative dark:bg-main-dark-bg'>
        <div className='fixed right-4 top-4 hover:drop-shadow-xl' style={{ zIndex: "1000" }}>
          <button type="button">
            <LogoutIcon className="text-3xl hover:drop-shadow-xl hover:bg-light-gray text-purple-700" />
          </button>
        </div>

        <div className={activeMenu ? "h-full md:ml-72 w-full" : "h-full w-full flex-2 "}>
          <div className='flex'>
            <div className='fixed md:static bg-main-bg navbar w-full bg-white text-left border-b border-gray-300 pt-5 pb-5 pl-3 bg-black'>
              repository statistics
               <nav>
              <ul>
                <li>
                  <Link to="/">Dashboard</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </nav>
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