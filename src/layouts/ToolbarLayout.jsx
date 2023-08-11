import React from 'react';
import { Link } from 'react-router-dom';
import Home from '../pages/Home';

function ToolbarLayout() {
  const activeMenu = true;

  return (
    <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 h-full border-pink-50' >
      {activeMenu && (
        <div className='flex justify-between items-center'>
            <div className="grid grid-rows-3 gap-4">

          <Link to="/" onClick={() => { }} className="item-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-right border-black ">
             <span> shoppy </span>
          </Link>

          <Link to="/" onClick={() => { }} className=" gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-right ">
             <span> stats </span>
          </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ToolbarLayout;
