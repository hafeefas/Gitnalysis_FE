import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Branches = ({ fullRepo }) => {
    const [branches, setBranches] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        async function fetchBranches() {
            try {
                if (typeof fullRepo !== 'string') {
                    console.error('fullRepo should be a string');
                    return;
                }
                const repoParts = fullRepo.split('/')
                const username = repoParts[0];
                const repo = repoParts[1];
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/branches/${username}/${repo}`,{},{withCredentials:true});
                setBranches(response.data.branches);
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        }

        fetchBranches();
    }, [fullRepo]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !triggerRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="h-full w-full flex items-center justify-center" onClick={() => setShowDropdown(!showDropdown)} ref={triggerRef} onMouseOver = {() => triggerRef.current.style.cursor = "pointer"}>
            <span className="font-bold text-white">{branches.length} Branches</span>
            {showDropdown && (
                <div className="absolute top-1 w-64 max-h-96 rounded-lg shadow-lg text-black z-10 border-2 border-white overflow-y-auto" style={{ backgroundColor: '#171C2Eff' }} ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
                    <ul className="rounded-lg">
                        {branches.map(branch => (
                            <li key={branch.name} className="border-b p-2 text-white">{branch.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Branches;
