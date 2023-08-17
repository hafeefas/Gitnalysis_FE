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

function MobileToolbarLayout() {

  const [open, setOpen] = useState(true);
  const activeMenu = true;

  return (
    <div className='flex h-full text-white border-r pb-10' >
      
      <div
        className={`h-screen ${open ? "p-5" : "p-2"} pt-8 ${
          open ? "w-64" : "w-0"
        }  fixed duration-300 border-r`} style={{backgroundColor:'#171C2Eff'}}
      >
          
          <div className="inline-flex mb-4">
            <MdOutlineMenuOpen className={`hover:text-violet-300 overflow-visible  bg-white text-black text-3xl rounded-md absolute -right-3 bottom-1/3  border-black border cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}/>
      {open ? (
  <div>
    <BsGithub className={`rounded cursor-pointer block text-3xl float-left mr-2 duration-300 mt-12 ${open && "rotate-[360deg]"}`} />
    <h1 className={`text-white font-sans-serif font-medium text-2xl duration-300 ${!open && "scale-0"}`}>
      GITNALYSIS
    </h1>
  </div>
) : (
  <></>
)}

          </div>

          <div className={`hover:text-purple-500 hover:scale-110 duration-300 flex justify-start p-4 rounded-lg ${
            !open ? "px-1" : "px-4"
          }`} onClick={() => setOpen(!open)}>
            <Link to="/repos" className='flex items-center'>
              
              <h1 className={` font-medium font-sans-serif text-2xl ${
              !open && "hidden"
            }`}>Repository</h1>
              
            </Link>
          </div>

          <div className={`hover:text-purple-500 hover:scale-110 duration-300 flex justify-start p-4  ${
            !open ? "px-1" : "px-4"
          }`} onClick={() => setOpen(!open)}>
            <Link to="/"  className='flex items-center'>

              <h1 className={` font-medium font-sans-serif text-2xl ${
              !open && "hidden"
            }`}>Statistics</h1>
              
            </Link>
          </div>

          <div className={`hover:text-purple-500 hover:scale-110 duration-300 flex justify-start p-4  ${
            !open ? "px-1" : "px-4"
          }`} onClick={() => setOpen(!open)}>
            <Link to=""  className={` flex items-center`}>
              <h1 className={` font-medium font-sans-serif text-2xl ${
              !open && "hidden"
            }`}>
              Notifications
              </h1>
            </Link>
          </div>

          <div className={`hover:text-purple-500 hover:scale-110 duration-300 flex justify-start p-4  ${
            !open ? "px-1" : "px-4"
          }`} onClick={() => setOpen(!open)}>
            
            <Link to=""  className={`flex items-center `}>
              <h1 className={` font-medium font-sans-serif text-2xl ${
              !open && "hidden"
            }`}>
                Files
              </h1>
              
            </Link>
          </div>

      </div>

    </div> 

  );
}

export default MobileToolbarLayout;

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