import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import Login from './pages/Login';
import Repos from './pages/Repos';
import ChartLayout from './layouts/ChartLayout';
import NewChartLayout from './layouts/NewChartLayout';
import TabletChartLayout from './layouts/TabletChartLayout';
import ToolbarLayout from './layouts/ToolbarLayout';
import Navbar from './components/navbar';
import axios from 'axios';
import { getAuthenticatedUser, getUserRepos } from './services/githubLogin';
import { useMediaQuery } from '@mui/material';
import MobileToolbarLayout from './layouts/MobileToolbarLayout';

function App() {

  const [username,setUserName] = useState('');
  const [userid,setUserId] = useState('')
  const [repos,setRepos] = useState()
  const [currRepo, setCurrRepo] = useState('')
  const isTabletScreen = useMediaQuery('(max-width: 770px)');
  const isMobileScreen = useMediaQuery('(max-width: 420px)');

   useEffect(() => {
    console.log(process.env.REACT_APP_BACKEND_URL);
    const urlParams = new URLSearchParams(window.location.search);

    const userName = urlParams.get('username');
    const userId = urlParams.get('userId');
    console.log('Username:', userName);
    console.log('UserId:', userId);
    setUserName(userName);
    setUserId(userId);
    getAuthenticatedUser();
    console.log(currRepo,'is the current Repo')
      const fetchRepos = async () => {
    try {
      const reposFromAuth = await getUserRepos(); // Await the Promise here
      console.log(reposFromAuth);
      setRepos(reposFromAuth); // Set the state with the resolved data
    } catch (error) {
      console.error('Error fetching repos:', error);
    }
  };

  fetchRepos();
}, []);

  useEffect(() => {
    console.log(currRepo,'is the current repo view')
  },[currRepo])
  
  return (
    <div className="flex max-h-screen overflow-hidden" style={{backgroundColor:"#111526ff"}}>
      <Router>
        {/* Sidebar */}
        <div className="z-10">{isMobileScreen ? (<MobileToolbarLayout />) : (<ToolbarLayout />)}</div>

        <div className="flex-1">
          {/* Add navigation buttons for tabs */}
          <Navbar />

          {/* Set up routes */}
          <Routes>
            {/* Dashboard */}
            {/* <Route path="/" element={<ChartLayout username={username} currRepo={currRepo} />} /> */}
            {/* IF WE HAVE A SMALLER SCREEN INTO MOBILE, CHANGE TO A MOBILE READY pmLAYOUT */}
            {isTabletScreen ? (<Route path="/" element={<TabletChartLayout username={username} currRepo={currRepo} />} />) : (<Route path="/" element={<NewChartLayout username={username} currRepo={currRepo} />} />)}
            {/* Login Page */}
            <Route path="/login" element={<Login />} />
            <Route path="/repos" element={<Repos repos={repos} setCurrRepo={setCurrRepo}/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
