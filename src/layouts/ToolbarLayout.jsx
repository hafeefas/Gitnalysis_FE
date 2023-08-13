import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FolderIcon from '@mui/icons-material/Folder';
import EmailIcon from '@mui/icons-material/Email';
import SettingsIcon from '@mui/icons-material/Settings';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { MdMenuOpen, MdOutlineMenuOpen } from "react-icons/md";
import { BsGithub, BsFolder } from "react-icons/bs";
import { ImStatsBars } from "react-icons/im";
import { AiOutlineMail, AiOutlineFile } from "react-icons/ai";


//AiOutlineMail



function ToolbarLayout() {

  const [open, setOpen] = useState(true);
  const activeMenu = true;

  return (
    <div className='flex  text-white border-r border-black-300 ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10' >
      
      <div
        className={`bg-slate-800 h-screen p-5 pt-8 ${
          open ? "w-64" : "w-20"
        }  relative duration-300`}
      >
        <MdOutlineMenuOpen className={`hover:text-white  text-black text-3xl rounded-md absolute -right-0.5 top-8 border-black cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}/>
          <div className="inline-flex mb-4">
            <BsGithub className={` rounded cursor-pointer block text-3xl float-left mr-2 duration-300 ${
              open && "rotate-[360deg]"
            }`}/>
            <h1 className={`text-white font-serif font-medium text-2xl duration-300 ${!open && "scale-0"}`}>
              GITNALYSIS
            </h1>
          </div>

          <div className={`flex justify-start p-4  ${
            !open ? "px-1" : "px-4"
          }`}>
            <BsFolder className={` rounded cursor-pointer block text-2xl float-left mr-2 duration-300 `}/>
            <Link to="" onClick={() => { }} className={` font-medium font-serif text-2xl ${
              !open && "hidden"
            }`}>
              Repository
            </Link>
          </div>

          <div className={`flex justify-start p-4  ${
            !open ? "px-1" : "px-4"
          }`}>
            <ImStatsBars className={` rounded cursor-pointer block text-2xl float-left mr-2 duration-300 `}/>
            <Link to="" onClick={() => { }} className={` font-medium font-serif text-2xl ${
              !open && "hidden"
            }`}>
              Statistics
            </Link>
          </div>

          <div className={`flex justify-start p-4  ${
            !open ? "px-1" : "px-4"
          }`}>
            <AiOutlineMail className={` rounded cursor-pointer block text-2xl float-left mr-2 duration-300 `}/>
            <Link to="" onClick={() => { }} className={` font-medium font-serif text-2xl ${
              !open && "hidden"
            }`}>
              Notifications
            </Link>
          </div>

          <div className={`flex justify-start p-4  ${
            !open ? "px-1" : "px-4"
          }`}>
            <AiOutlineFile className={` rounded cursor-pointer block text-2xl float-left mr-2 duration-300 `}/>
            <Link to="" onClick={() => { }} className={` font-medium font-serif text-2xl ${
              !open && "hidden"
            }`}>
              Files
            </Link>
          </div>

      </div>

    </div> 

  );
}

export default ToolbarLayout;

//  <div className='bg-black text-white border-r border-black-300 ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10' >
//       {activeMenu && (
//         <div className='flex justify-between items-center'>
//           <div className="grid grid-rows-3 gap-4">
//             <Link to="/" onClick={() => { }} className="item-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-right border-black ">
//               <FolderIcon />            </Link>


//             <Link to="/login" onClick={() => { }} className=" gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-right ">
//               <EmailIcon />
//             </Link>
//           </div>

//         </div>
//       )}
//       <div className='flex justify-center items-end p-4  bottom-4 left-0 '>
//         <SettingsIcon />
//         <p></p>
//       </div>
//     </div> 