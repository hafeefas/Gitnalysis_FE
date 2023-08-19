import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const currRepo = useSelector((state) => state.repo.currRepo);

  useEffect(() => {
    async function fetchBranches() {
      try {
        if (typeof currRepo !== "string") {
          console.error("currRepo should be a string");
          return;}
        const repoParts = currRepo.split("/");
        const username = repoParts[0];
        const repo = repoParts[1];
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/branches/${username}/${repo}`,
          {},
          { withCredentials: true }
        );
        setBranches(response.data.branches);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    }

    fetchBranches();
  }, [currRepo]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

    const handleBranchClick = (branchName) => {
        const url = `https://github.com/${currRepo}/tree/${branchName}`;
        window.open(url, '_blank');
    };

    return (
        <div className="h-full w-full flex items-center justify-center" onClick={() => setShowDropdown(!showDropdown)} ref={triggerRef} onMouseOver = {() => triggerRef.current.style.cursor = "pointer"}>
            <span className="font-bold text-white">{branches.length} Branches</span>
            {showDropdown && (
                <div className="absolute top-1 w-64 max-h-96 rounded-lg shadow-lg text-black z-10 border-2 border-white overflow-y-auto" style={{ backgroundColor: '#171C2Eff' }} ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
                    <ul className="rounded-lg">
                        {branches.map(branch => (
                            <li key={branch.name} className="border-b p-2 text-white cursor-pointer hover:bg-gray-700" onClick={() => handleBranchClick(branch.name)}>{branch.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
      )
};

export default Branches;
