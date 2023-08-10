import logo from './logo.svg';
import './App.css';
import ChartLayout from './layouts/ChartLayout';
import ToolbarLayout from './layouts/ToolbarLayout';
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import Home from './pages/Home';

function App() {
  // will put this somewhere else later
  const activeMenu = false;

  return (
    <div className="App">
      <Router>
        <div className='flex relative dark: bg-main-dark-bg'>
          <div className='fixed right-4 top-4 hover: drop-shadow-xl' style={{ zIndex: "1000" }}>
            {/* put icon here */}
            <button type="button">
              <LogoutIcon className="text-3xl hover:drop-shadow-xl hover:bg-light-gray text-purple-700" />
            </button>
          </div>

          {/* 58 */}
          <div className=' border-pink-50 h-screen' style={{ border: "solid pink 4px" }}>
            <ToolbarLayout />
          </div>

          <div className={activeMenu ? "md:ml-72 w-full" : "w-full flex-2"}>
            <div className='fixed md:static bg-main-bg navbar w-full bg-white text-left border-b border-gray-300 pt-5 pb-5 pl-3'>
              Repository Statistics
            </div>
            <ChartLayout/> 
          </div>
        </div>


        <Routes>
          {/* Dashboard */}
          <Route path="/" element={<Home />} />

          {/* components */}
          <Route path="toolbarlayout" element={<ToolbarLayout />} />
          {/* <Route path="chartlayout" element={<ChartLayout/>}/> */}
        </Routes>
      </Router>

    </div>
  );
}

export default App;
