import React from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";
import gitnalsyisBackground from "../assets/gitnalysis_coder.png";
import MetricsIcon from "../icons/MetricsIcon";
import LinkIcon from "../icons/LinkIcon";
import RepoSearch from "../components/RepoSearch";
import { BsStars } from "react-icons/bs";
import { FaCodeFork } from "react-icons/fa6";
import { VscRepo, VscGitPullRequest } from "react-icons/vsc";
import { AiOutlineArrowDown } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const ReposHome = () => {
  const isMediumScreen = useMediaQuery("(max-width: 1100px)");
  const isTabletScreen = useMediaQuery("(max-width: 770px)");
  const isMobileScreen = useMediaQuery("(max-width: 420px)");

  return isMobileScreen ? (
    <div
      className="w-full h-screen bg-gray-200 overflow-scroll text-white"
      style={{ backgroundColor: "#111526ff" }}
    >
      <div className="grid w-3/4 translate-x-3 mt-12 grid-cols-2 h-5/6 grid-rows-0 row-span-8 text-center z-10 justify-center mx-auto">
        <div
          className="flex row-span-1 col-span-2  justify-center items-end pb-8 text-5xl"
          style={{ fontFamily: `'Domine', serif` }}
        >
          <div className="mr-1" style={{ color: "#f3502aff" }}>
            git
          </div>
          <div>nalysis</div>
        </div>
        <div
          className="flex col-start-1 col-span-2 break-words -mb-20 font-bold items-begin justify-center"
          style={{
            fontFamily: `"Montserrat", sans-erif`,
          }}
        >
          {/* Discover insights and metrics of your favorite GitHub repositories */}
          Discover insights and metrics of your favorite GitHub repositories
        </div>
        <div className="translate-x-1/2">
          <img src={gitnalsyisBackground} />
        </div>
        <div
          className="flex flex-col -mt-24 col-start-1 col-span-2 break-words  font-bold items-center justify-center mb-2"
          style={{
            fontFamily: `"Montserrat", sans-erif`,
          }}
        >
          {/* Discover insights and metrics of your favorite GitHub repositories */}
          <RepoSearch />
          <div className="flex text-[4vw] mb-10 mt-10">
            <div className="flex items-center mr-4">
              <AiOutlineArrowDown style={{ fontSize: "1.5rem" }} />
            </div>
            Or, choose from your repo categories:
            <div className="flex items-center ml-4">
              <AiOutlineArrowDown style={{ fontSize: "1.5rem" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-5 gap-4 -mt-12 justify-center mx-auto ">
        <div className="col-span-2 h-28 ml-12 w-4/5">
          <NavLink to="/ownedRepos">
            <div
              className="flex col-start-2 border-white border-2 border-dotted row-start-1 col-span-1 rounded-md h-4/5 shadow-3xl m-2  items-center justify-center font-bold text-white hover:bg-gradient-to-br hover:bg-gradient-to-br from-lime-400 to-green-500 hover:text-black"
              style={{ backgroundColor: "#171C2Eff" }}
            >
              <div className="mr-4">
                <VscRepo style={{ color: "green", fontSize: "24px" }} />
              </div>
              Repos You Own
              <div className="ml-4">
                <VscRepo style={{ color: "green", fontSize: "24px" }} />
              </div>
            </div>
          </NavLink>
        </div>
        <div className="col-span-2 h-28 ml-12 w-4/5 col-start-1 row-start-3">
          <NavLink to="/forkedrepos">
            <div
              className="flex col-start-2 h-4/5 row-start-3 border-white border-2 border-dotted rounded-md shadow-3xl m-2 items-center justify-center font-bold text-white hover:bg-gradient-to-br from-teal-300 hover:to-sky-500 hover:text-black"
              style={{ backgroundColor: "#171C2Eff" }}
            >
              <div className="mr-2">
                <FaCodeFork style={{ color: "gray", fontSize: "24px" }} />
              </div>
              <div className="flex text-center">Repos You've Forked</div>
              <div className="ml-2">
                <FaCodeFork style={{ color: "gray", fontSize: "24px" }} />
              </div>
            </div>
          </NavLink>
        </div>
        <div className="col-span-2 h-28 ml-12 w-4/5 col-start-1 row-start-2">
          <NavLink to="/starredRepos">
            <div
              className="flex col-start-2 h-4/5 col-span-1  border-white border-2 border-dotted row-start-2 rounded-md shadow-3xl m-2 items-center justify-center font-bold text-white hover:bg-gradient-to-br from-pink-500 hover:to-yellow-500 hover:text-black"
              style={{ backgroundColor: "#171C2Eff" }}
            >
              <div className="mr-4">
                <BsStars style={{ color: "yellow", fontSize: "24px" }} />
              </div>
              Your Starred Repos
              <div className="ml-4">
                <BsStars style={{ color: "yellow", fontSize: "24px" }} />
              </div>
            </div>
          </NavLink>
        </div>
        <div className="col-span-2 col-start-1 row-start-4 ml-12 w-4/5 h-28">
          <div
            className="flex col-span-2 h-4/5 row-start-4 border-white border-2 border-dotted rounded-md shadow-3xl m-2 items-center justify-center font-bold text-white hover:bg-gradient-to-br from-pink-500 hover:to-purple-500 hover:text-black mb-10"
            style={{ backgroundColor: "#171C2Eff" }}
          >
            <div className="mr-4">
              <VscGitPullRequest
                style={{ color: "#cb9ac4ff", fontSize: "24px" }}
              />
            </div>
            Other Repos
            <div className="ml-4">
              <VscGitPullRequest
                style={{ color: "#cb9ac4ff", fontSize: "24px" }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 ml-10 w-3/4 ">
            <div className="col-span-1 row-span-1 ">
              <div className="flex flex-col justify-center items-center">
                <MetricsIcon />
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <div className="flex flex-col justify-center items-center">
                <LinkIcon />
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <div className="flex flex-col justify-center items-center">
                <div className="flex w-36 justify-center text-base text-center text-[1.5vw] pb-20">
                  Analyze metrics for owned and starred repos
                </div>
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <div className="flex flex-col justify-center items-center">
                <div className="flex w-36 justify-center text-base text-center mb-4 text-[1.5vw]">
                  Link to all repos you've contributed to
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : isTabletScreen ? (
    <div
      className="w-full h-screen ml-8 bg-gray-200 overflow-scroll text-white"
      style={{ backgroundColor: "#111526ff" }}
    >
      <div className="grid w-3/4 mt-12 grid-cols-2 h-5/6 grid-rows-0 row-span-8 text-center z-10 justify-center mx-auto">
        <div
          className="flex row-span-1 col-span-2  justify-center items-end pb-8 text-5xl"
          style={{ fontFamily: `'Domine', serif` }}
        >
          <div className="mr-1" style={{ color: "#f3502aff" }}>
            git
          </div>
          <div>nalysis</div>
        </div>
        <div
          className="flex col-start-1 col-span-2 break-words -mb-20 font-bold items-begin justify-center"
          style={{
            fontFamily: `"Montserrat", sans-erif`,
          }}
        >
          {/* Discover insights and metrics of your favorite GitHub repositories */}
          Discover insights and metrics of your favorite GitHub repositories
        </div>
        <div className="translate-x-1/2 ">
          <img src={gitnalsyisBackground} />
        </div>
        <div
          className="flex flex-col -mt-24 col-start-1 col-span-2 break-words  font-bold items-center justify-center mb-2"
          style={{
            fontFamily: `"Montserrat", sans-erif`,
          }}
        >
          {/* Discover insights and metrics of your favorite GitHub repositories */}
          <RepoSearch />
          <div className="flex text-[2vw] mb-10 mt-10">
            <div className="flex items-center mr-4">
              <AiOutlineArrowDown style={{ fontSize: "1.5rem" }} />
            </div>
            Or, choose from your repo categories:
            <div className="flex items-center ml-4">
              <AiOutlineArrowDown style={{ fontSize: "1.5rem" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-5 gap-4 -mt-12 w-96 justify-center mx-auto w-96">
        <div className="col-span-2 h-28">
          <NavLink to="/ownedRepos">
            <div
              className="flex col-start-2 border-white border-2 border-dotted row-start-1 col-span-1 rounded-md h-4/5 shadow-3xl m-2 items-center justify-center font-bold text-white hover:bg-gradient-to-br hover:bg-gradient-to-br from-lime-400 to-green-500 hover:text-black"
              style={{ backgroundColor: "#171C2Eff" }}
            >
              <div className="mr-4">
                <VscRepo style={{ color: "green", fontSize: "24px" }} />
              </div>
              Repos You Own
              <div className="ml-4">
                <VscRepo style={{ color: "green", fontSize: "24px" }} />
              </div>
            </div>
          </NavLink>
        </div>
        <div className="col-span-2 h-28 col-start-1 row-start-3">
          <NavLink to="/forkedrepos">
            <div
              className="flex col-start-2 h-4/5 row-start-3 border-white border-2 border-dotted rounded-md shadow-3xl m-2 items-center justify-center font-bold text-white hover:bg-gradient-to-br from-teal-300 hover:to-sky-500 hover:text-black"
              style={{ backgroundColor: "#171C2Eff" }}
            >
              <div className="mr-4">
                <FaCodeFork style={{ color: "gray", fontSize: "24px" }} />
              </div>
              Repos You've Forked
              <div className="ml-4">
                <FaCodeFork style={{ color: "gray", fontSize: "24px" }} />
              </div>
            </div>
          </NavLink>
        </div>
        <div className="col-span-2 h-28 col-start-1 row-start-2">
          <NavLink to="/starredRepos">
            <div
              className="flex col-start-2 h-4/5 col-span-1  border-white border-2 border-dotted row-start-2 rounded-md shadow-3xl m-2 items-center justify-center font-bold text-white hover:bg-gradient-to-br from-pink-500 hover:to-yellow-500 hover:text-black"
              style={{ backgroundColor: "#171C2Eff" }}
            >
              <div className="mr-4">
                <BsStars style={{ color: "yellow", fontSize: "24px" }} />
              </div>
              Your Starred Repos
              <div className="ml-4">
                <BsStars style={{ color: "yellow", fontSize: "24px" }} />
              </div>
            </div>
          </NavLink>
        </div>
        <div className="col-span-2 col-start-1 row-start-4  h-28">
          <div
            className="flex col-span-2 h-4/5 row-start-4 border-white border-2 border-dotted rounded-md shadow-3xl m-2 items-center justify-center font-bold text-white hover:bg-gradient-to-br from-pink-500 hover:to-purple-500 hover:text-black mb-10"
            style={{ backgroundColor: "#171C2Eff" }}
          >
            <div className="mr-4">
              <VscGitPullRequest
                style={{ color: "#cb9ac4ff", fontSize: "24px" }}
              />
            </div>
            Other Repos
            <div className="ml-4">
              <VscGitPullRequest
                style={{ color: "#cb9ac4ff", fontSize: "24px" }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 ml-12w-3/4 ">
            <div className="col-span-1 row-span-1 ">
              <div className="flex flex-col justify-center items-center">
                <MetricsIcon />
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <div className="flex flex-col justify-center items-center">
                <LinkIcon />
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <div className="flex flex-col justify-center items-center">
                <div className="flex w-36 justify-center text-base text-center text-[1.5vw] pb-20">
                  Analyze metrics for owned and starred repos
                </div>
              </div>
            </div>
            <div className="col-span-1 row-span-1">
              <div className="flex flex-col justify-center items-center">
                <div className="flex w-36 justify-center text-base text-center mb-4 text-[1.5vw]">
                  Link to all repos you've contributed to
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      className="flex w-full h-screen bg-gray-200 overflow-scroll text-white mt-6"
      style={{ backgroundColor: "#111526ff" }}
    >
      <div
        className={`grid ${
          isMediumScreen ? "w-full" : "w-3/4"
        } grid-cols-2 h-5/6 grid-rows-0 row-span-8 ml-8 text-center z-10`}
      >
        <div
          className="flex row-span-1 col-span-2  justify-center items-end pb-8 text-5xl"
          style={{ fontFamily: `'Domine', serif` }}
        >
          <div className="mr-1" style={{ color: "#f3502aff" }}>
            git
          </div>
          <div>nalysis</div>
        </div>
        <div
          className="flex col-start-1 col-span-2 break-words  font-bold items-begin justify-center"
          style={{
            fontFamily: `"Montserrat", sans-erif`,
          }}
        >
          {/* Discover insights and metrics of your favorite GitHub repositories */}
          Discover insights and metrics of your favorite GitHub repositories
        </div>

        <div
          className="flex flex-col mt-10 col-start-1 col-span-2 break-words  font-bold items-center justify-center mb-2"
          style={{
            fontFamily: `"Montserrat", sans-erif`,
          }}
        >
          {/* Discover insights and metrics of your favorite GitHub repositories */}
          <RepoSearch />
        </div>
        <div className="grid grid-cols-2 grid-rows-4 col-span-2 row-span-4">
          <div
            className="flex col-start-1 col-span-1 row-span-4 text-[3vw] md:text-[2vw] sm:text-[1.5vw]"
            style={{
              fontFamily: `"Montserrat", sans-erif`,
            }}
          >
            <div className="grid items-center ml-12 mr-10">
              <div className="text-[2.5vw] md:text-[1.75vw] sm:text-[1vw] mb-10">
                Or, choose from your repo categories:
              </div>
              <ul className="-mt-10">
                {isMediumScreen ? (
                  <li
                    className={`flex break-normal mb-2 ${
                      isMediumScreen ? "flex-col" : ""
                    }`}
                  >
                    <div className="flex justify-center">
                      <MetricsIcon />
                    </div>
                    <div className="flex justify-center text-base text-center ml-4 w-5/6 mb-4 text-[1.5vw] md:text-[1.5vw] sm:text-[1.25vw]">
                      View metrics for owned and starred repos
                    </div>
                  </li>
                ) : (
                  <li
                    className={`flex flex-start break-normal mb-2 ${
                      isMediumScreen ? "flex-col" : ""
                    }`}
                  >
                    <div>
                      <MetricsIcon />
                    </div>
                    <div className="text-base text-left ml-4 w-5/6 mb-4 text-[1.5vw] md:text-[1.25vw] sm:text-[1vw]">
                      View metrics for owned and starred repos
                    </div>
                  </li>
                )}
                {isMediumScreen ? (
                  <li
                    className={`flex break-normal mb-2 ${
                      isMediumScreen ? "flex-col" : ""
                    }`}
                  >
                    <div className="flex justify-center">
                      <LinkIcon />
                    </div>
                    <div className="flex justify-center text-base text-center ml-4 w-5/6 mb-4 text-[1.5vw] md:text-[1.5vw] sm:text-[1.25vw]">
                      View metrics for owned and starred repos
                    </div>
                  </li>
                ) : (
                  <li
                    className={`flex flex-start break-normal mb-2 ${
                      isMediumScreen ? "flex-col" : ""
                    }`}
                  >
                    <LinkIcon />
                    <div className="text-base text-left ml-4 w-5/6 text-[1.5vw] md:text-[1.5vw] sm:text-[1.25vw]">
                      Link to your forked repos and others you've contributed to
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <NavLink to="/ownedRepos">
            <div
              className="flex col-start-2 border-white border-2 border-dotted row-start-1 col-span-1 rounded-md h-4/5 shadow-3xl m-2 items-center justify-center font-bold text-white hover:bg-gradient-to-br hover:bg-gradient-to-br from-lime-400 to-green-500 hover:text-black"
              style={{ backgroundColor: "#171C2Eff" }}
            >
              <div className="mr-4">
                <VscRepo style={{ color: "green", fontSize: "24px" }} />
              </div>
              Repos You Own
              <div className="ml-4">
                <VscRepo style={{ color: "green", fontSize: "24px" }} />
              </div>
            </div>
          </NavLink>
          <NavLink to="/starredRepos">
            <div
              className="flex col-start-2 h-4/5 col-span-1  border-white border-2 border-dotted row-start-2 rounded-md shadow-3xl m-2 items-center justify-center font-bold text-white hover:bg-gradient-to-br from-pink-500 hover:to-yellow-500 hover:text-black"
              style={{ backgroundColor: "#171C2Eff" }}
            >
              <div className="mr-4">
                <BsStars style={{ color: "yellow", fontSize: "24px" }} />
              </div>
              Your Starred Repos
              <div className="ml-4">
                <BsStars style={{ color: "yellow", fontSize: "24px" }} />
              </div>
            </div>
          </NavLink>
          <NavLink to="/forkedrepos">
            <div
              className="flex col-start-2 h-4/5 row-start-3 border-white border-2 border-dotted rounded-md shadow-3xl m-2 items-center justify-center font-bold text-white hover:bg-gradient-to-br from-teal-300 hover:to-sky-500 hover:text-black"
              style={{ backgroundColor: "#171C2Eff" }}
            >
              <div className="mr-4">
                <FaCodeFork style={{ color: "gray", fontSize: "24px" }} />
              </div>
              Repos You've Forked
              <div className="ml-4">
                <FaCodeFork style={{ color: "gray", fontSize: "24px" }} />
              </div>
            </div>
          </NavLink>

          <div
            className="flex col-start-2 h-4/5 row-start-4 border-white border-2 border-dotted rounded-md shadow-3xl m-2 items-center justify-center font-bold text-white hover:bg-gradient-to-br from-pink-500 hover:to-purple-500 hover:text-black"
            style={{ backgroundColor: "#171C2Eff" }}
          >
            <div className="mr-4">
              <VscGitPullRequest
                style={{ color: "#cb9ac4ff", fontSize: "24px" }}
              />
            </div>
            Other Repos
            <div className="ml-4">
              <VscGitPullRequest
                style={{ color: "#cb9ac4ff", fontSize: "24px" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex justify-center items-center -translate-y-12 -translate-x-14 ${
          isMediumScreen ? "-translate-x-20" : ""
        }`}
      >
        <img src={gitnalsyisBackground} />
      </div>
    </div>
  );
};

export default ReposHome;
