import logo from './logo.svg';
import ChartLayout from './layouts/ChartLayout';
import ToolbarLayout from './layouts/ToolbarLayout';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import Login from './pages/Login';


function App() {
  // will put this somewhere else later
  const activeMenu = false;

  return (
    <div className="bg-gray-500">
      <Router>
        <div className='flex relative dark:bg-main-dark-bg'>
          <div className='fixed right-4 top-4 hover:drop-shadow-xl' style={{ zIndex: "1000" }}>
            <button type="button">
              <LogoutIcon className="text-3xl hover:drop-shadow-xl hover:bg-light-gray text-purple-700" />
            </button>
          </div>

          <div className='border-pink-50 h-screen' style={{ border: "solid pink 4px" }}>
            <ToolbarLayout />
          </div>

          <div className={activeMenu ? "h-full md:ml-72 w-full" : "h-screen w-full flex-2 "}>
            <div className='flex'>
              <div className='fixed md:static bg-main-bg navbar w-full bg-white text-left border-b border-gray-300 pt-5 pb-5 pl-3 bg-black'>
                repository statistics
              </div>
            </div>
            <div className="flex-grow">
              <ChartLayout />

           
              <Routes>
                {/* Login Page */}
                <Route path="/login" element={<Login />} />

                {/* components */}
                <Route path="toolbarlayout" element={<ToolbarLayout />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;

