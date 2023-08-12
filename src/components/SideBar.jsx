import React from 'react';
import { Link } from 'react-router-dom';
import Home from '../pages/Home';

function SideBar() {
  const activeMenu = true;

  return (
    <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 border border-gray-300'>
      {activeMenu && (
        <div className='flex justify-between items-center'>
          <Link to="/" onClick={() => { }} className="item-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-right border-black">
             <span> shoppy </span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default SideBar;


