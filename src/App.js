import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import Login from './pages/Login';
import Repos from './pages/Repos';
import ChartLayout from './layouts/ChartLayout';
import ToolbarLayout from './layouts/ToolbarLayout';
import Navbar from './components/navbar';
import axios from 'axios';
import { getAuthenticatedUser, getUserRepos } from './services/githubLogin';

function App() {

  const [username,setUserName] = useState('');
  const [userid,setUserId] = useState('')
  const [repos,setRepos] = useState()
  const [currRepo, setCurrRepo] = useState('')

   useEffect(() => {
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
    <div className=" flex " style={{backgroundColor:"#6e6e6e"}}>
      <Router>
        {/* Sidebar */}
        <ToolbarLayout />

        <div className="flex-1">
          {/* Add navigation buttons for tabs */}
          <Navbar />

          {/* Set up routes */}
          <Routes>
            {/* Dashboard */}
            <Route path="/" element={<ChartLayout username={username} currRepo={currRepo} />} />

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
