import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Collaborators = () => {
  const [collaborators, setCollaborators] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const currRepo = useSelector((state) => state.repo.currRepo);

  useEffect(() => {
    async function fetchCollaborators() {
      try {
        if (typeof currRepo !== "string") {
          console.error("currRepo should be a string");
          return;
        }
        const repoParts = currRepo.split("/");
        const username = repoParts[0];
        const repo = repoParts[1];
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/collaborators/${username}/${repo}`,
          {},
          { withCredentials: true }
        );
        setCollaborators(response.data.collaborators);
      } catch (error) {
        console.error("Error fetching collaborators:", error);
      }
    }

        fetchCollaborators();
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

  return (
    <div
      className="h-full w-full flex items-center justify-center"
      onClick={() => setShowDropdown(!showDropdown)}
      ref={triggerRef}
      onMouseOver={() => (triggerRef.current.style.cursor = "pointer")}
    >
      <span className="font-bold text-white">
        {collaborators.length} Collaborators
      </span>
      {console.log("coll" + JSON.stringify(collaborators[0]))}
      {showDropdown && (
        <div
          className="absolute top-1 w-64 max-h-96 rounded-lg shadow-lg text-black z-10 border-2 border-white overflow-y-auto"
          style={{ backgroundColor: "#171C2Eff" }}
          ref={dropdownRef}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="rounded-lg">
            {collaborators.map((collaborator) => (
              <li key={collaborator.login} className="border-b p-2 text-white">
                <img
                  src={collaborator.avatar_url}
                  alt="avatar"
                  width="30px"
                  height="30px"
                  style={{
                    display: "inline-block",
                    marginRight: "25px",
                    borderRadius: "100%",
                  }}
                />
                {collaborator.login}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Collaborators;
