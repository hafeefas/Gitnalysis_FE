import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdMenuOpen } from "react-icons/md";

// MdMenuOpen

function ToolbarLayout() {

  const [open, setOpen] = useState(true);
  const activeMenu = true;

  return (
      <div className="flex">
      {/* Arrow to open and close side bar */}
      <div
        className={`bg-slate-700 h-auto p-5 pt-8 ${
          open ? "w-72" : "w-20"
        }  relative duration-300`}
      >
        <MdMenuOpen className={`bg-white text-dark-green text-3xl rounded-full absolute -right-3 top-9 border border-white cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}/>
          <div className="inline-flex">

            <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${
              !open && "scale-0"
            }`}>
              GITNALYSIS
            </h1>


          </div>
      </div>
      </div>
  );
}

export default ToolbarLayout;
