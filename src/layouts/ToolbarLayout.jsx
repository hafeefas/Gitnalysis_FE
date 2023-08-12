import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FolderIcon from '@mui/icons-material/Folder';
import EmailIcon from '@mui/icons-material/Email';
import SettingsIcon from '@mui/icons-material/Settings';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

function ToolbarLayout() {

  const [open, setOpen] = useState(true);
  const activeMenu = true;

  return (
    <div className='bg-black text-white border-r border-black-300 ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10' >
      {activeMenu && (
        <div className='flex justify-between items-center'>
          <div className="grid grid-rows-3 gap-4">
            <Link to="/" onClick={() => { }} className="item-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-right border-black ">
              <FolderIcon />            </Link>


            <Link to="/login" onClick={() => { }} className=" gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-right ">
              <EmailIcon />
            </Link>
          </div>

        </div>
      )}
      <div className='flex justify-center items-end p-4  bottom-4 left-0 '>
        <SettingsIcon />
        <p></p>
      </div>
    </div>

  );
}

export default ToolbarLayout;
