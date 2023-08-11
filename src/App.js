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

          <div className={activeMenu ? "md:ml-72 w-full" : "w-full"}>
            <div className='flex'> 
              <div className='fixed md:static bg-white'>
                Navbar
              </div>
              <div className="flex-grow">
                <Routes>

                  {/* Login Page */}
                  <Route path="/login" element={<Login />} />

                  {/* components */}
                  <Route path="toolbarlayout" element={<ToolbarLayout />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;

