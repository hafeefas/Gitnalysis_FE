import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import Login from './pages/Login';
import ChartLayout from './layouts/ChartLayout';
import ToolbarLayout from './layouts/ToolbarLayout';
import Navbar from './components/navbar';

function App() {
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
            <Route path="/" element={<ChartLayout />} />

            {/* Login Page */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
