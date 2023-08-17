import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Branches = ({ username, repo }) => {
    const [branches, setBranches] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        async function fetchBranches() {
            try {
                const response = await axios.get(`http://localhost:8080/api/branches/${username}/${repo}`);
                setBranches(response.data.branches);
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        }

        fetchBranches();
    }, [username, repo]);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="flex col-span-1 h-32 p-2 items-center justify-center rounded-xl shadow-3xl" style={{ backgroundColor: '#171C2Eff' }} onClick={toggleDropdown}>
            {branches.length} Branches
            {showDropdown && (
                <div className="absolute mt-2 w-64 rounded-md shadow-lg bg-white">
                    <ul>
                        {branches.map(branch => (
                            <li key={branch.name} className="border-b p-2">{branch.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Branches;
