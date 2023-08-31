import React, { useState } from "react";
import { Link } from "react-router-dom";
import FolderIcon from "@mui/icons-material/Folder";
import EmailIcon from "@mui/icons-material/Email";
import SettingsIcon from "@mui/icons-material/Settings";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { MdMenuOpen, MdOutlineMenuOpen } from "react-icons/md";
import { BsGithub, BsFolder } from "react-icons/bs";
import { ImStatsBars } from "react-icons/im";
import { AiOutlineMail, AiOutlineFile } from "react-icons/ai";
import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

//AiOutlineMail

function ToolbarLayout() {
  const [open, setOpen] = useState(false);
  const activeMenu = true;
  const isTabletScreen = useMediaQuery("(max-width: 770px)");

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  return (
    <div className="flex h-full text-white border-r">
      <div
        className={`h-full p-5 pt-8 border-r ${
          open ? "w-64" : isTabletScreen ? "w-16" : "w-20"
        }  ${isTabletScreen ? "absolute" : "relative"} duration-300`}
        style={{ backgroundColor: "#171C2Eff" }}
      >
        <MdOutlineMenuOpen
          className={`hover:text-violet-300 overflow-visible  ${
            open === true ? "bg-orange-700" : "bg-white"
          }  text-black text-3xl rounded-md absolute -right-3 bottom-1/2  border-black border cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="fixed">
          <div className="inline-flex mb-4 mt-12">
            <BsGithub
              className={`rounded cursor-pointer block text-3xl float-left mr-2 duration-300 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-white font-sans-serif font-medium text-2xl duration-300 ${
                !open && "scale-0"
              }`}
            >
              GITNALYSIS
            </h1>
          </div>
          <BootstrapTooltip title="Repositories" placement="right-start">
            <div
              className={`hover:text-orange-700 hover:scale-110 duration-300 flex justify-start p-4 rounded-lg ${
                !open ? "px-1" : "px-4"
              }`}
              onClick={() => setOpen(!open)}
            >
              <Link to="/repos" className="flex items-center">
                <BsFolder
                  className={` rounded cursor-pointer block text-2xl float-left mr-2 duration-300 `}
                />
                <h1
                  className={` font-medium font-sans-serif text-2xl ${
                    !open && "hidden"
                  }`}
                >
                  Repositories
                </h1>
              </Link>
            </div>
          </BootstrapTooltip>
          <BootstrapTooltip
            title="Statistics & Metrics"
            placement="right-start"
          >
            <div
              className={`hover:text-orange-700 hover:scale-110 duration-300 flex justify-start p-4  ${
                !open ? "px-1" : "px-4"
              }`}
              onClick={() => setOpen(!open)}
            >
              <Link to="/" className="flex items-center">
                <ImStatsBars
                  className={` rounded cursor-pointer block text-2xl float-left mr-2 duration-300 `}
                />

                <h1
                  className={` font-medium font-sans-serif text-2xl ${
                    !open && "hidden"
                  }`}
                >
                  Statistics
                </h1>
              </Link>
            </div>
          </BootstrapTooltip>
          <BootstrapTooltip title="Notifications" placement="right-start">
            <div
              className={`hover:text-orange-700 hover:scale-110 duration-300 flex justify-start p-4  ${
                !open ? "px-1" : "px-4"
              }`}
              onClick={() => setOpen(!open)}
            >
              <Link to="/notifications" className={` flex items-center`}>
                <AiOutlineMail
                  className={` rounded cursor-pointer block text-2xl float-left mr-2 duration-300 `}
                />
                <h1
                  className={` font-medium font-sans-serif text-2xl ${
                    !open && "hidden"
                  }`}
                >
                  Notifications
                </h1>
              </Link>
            </div>
          </BootstrapTooltip>
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
