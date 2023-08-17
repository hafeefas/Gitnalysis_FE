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
                const username = fullRepo[0];
                const repo = fullRepo[1];
                const response = await axios.get(`http://localhost:8080/api/branches/${username}/${repo}`);
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
        <div className="flex col-span-1 h-32 p-2 items-center justify-center rounded-xl shadow-3xl text-white relative" style={{ backgroundColor: '#171C2Eff' }} onClick={() => setShowDropdown(!showDropdown)} ref={triggerRef}>
            <span className="font-bold text-red-600">{branches.length} Branches</span>
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
