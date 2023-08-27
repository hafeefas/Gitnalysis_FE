import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUsername } from "./redux/slices/userSlice";
import { getLoggedInUser } from "./redux/slices/userSlice";
import Repos from "./pages/Repos";
import Notifications from "./pages/Notifications";
import NewChartLayout from "./layouts/NewChartLayout";
import TabletChartLayout from "./layouts/TabletChartLayout";
import ToolbarLayout from "./layouts/ToolbarLayout";
import Navbar from "./components/navbar";
import { useMediaQuery } from "@mui/material";
import MobileToolbarLayout from "./layouts/MobileToolbarLayout";
import ReposHome from "./pages/ReposHome";
import OwnedRepos from "./pages/OwnedRepos";

function App() {
  const [username, setUserName] = useState("");
  const [userid, setUserId] = useState("");
  const [currRepo, setCurrRepo] = useState("");
  const isTabletScreen = useMediaQuery("(max-width: 770px)");
  const isMobileScreen = useMediaQuery("(max-width: 420px)");
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(process.env.REACT_APP_BACKEND_URL);
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get("username");
    const userId = urlParams.get("userId");
    // console.log("Username:", userName);
    // console.log("UserId:", userId);
    if (userName !== null) {
      dispatch(setUsername(userName));
    }
    setUserName(userName);
    setUserId(userId);
    dispatch(getLoggedInUser());
    // getAuthenticatedUser();
    // console.log(currRepo, "is the current Repo");
    // const fetchRepos = async () => {
    //   try {
    //     const reposFromAuth = await getUserRepos(); // Await the Promise here
    //     console.log(reposFromAuth);
    //     setRepos(reposFromAuth); // Set the state with the resolved data
    //   } catch (error) {
    //     console.error("Error fetching repos:", error);
    //   }
    // };

    // fetchRepos();
  }, []);

  useEffect(() => {
    console.log(currRepo, "is the current repo view");
  }, [currRepo]);

  return (
    <div
      className="flex max-h-screen overflow-hidden"
      style={{ backgroundColor: "#111526ff" }}
    >
      <Router>
        {/* Sidebar */}
        <div className="z-10">
          {isMobileScreen ? <MobileToolbarLayout /> : <ToolbarLayout />}
        </div>
        <div className="flex-1">
          {/* Add navigation buttons for tabs */}
          <Navbar />

          {/* Set up routes */}
          <Routes>
            {/* Dashboard */}
            {/* <Route path="/" element={<ChartLayout username={username} currRepo={currRepo} />} /> */}
            {/* IF WE HAVE A SMALLER SCREEN INTO MOBILE, CHANGE TO A MOBILE READY pmLAYOUT */}
            {isTabletScreen ? (
              <Route
                path="/"
                element={
                  <TabletChartLayout username={username} currRepo={currRepo} />
                }
              />
            ) : (
              <Route path="/" element={<NewChartLayout />} />
            )}
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/repos" element={<ReposHome />} />
            <Route path="/ownedRepos" element={<OwnedRepos />} />
            <Route path="/starredRepos" element={<OwnedRepos />} />
            <Route path="/reposlist" element={<Repos />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
