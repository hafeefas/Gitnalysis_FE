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
        <div className="flex col-span-1 h-32 p-2 items-center justify-center rounded-xl shadow-3xl text-white relative" style={{ backgroundColor: '#171C2Eff' }} onClick={toggleDropdown}>
            <span className="font-bold text-red-600">{branches.length} Branches</span>
            {showDropdown && (
                <div className="absolute top-1 w-64 rounded-lg shadow-lg text-black z-10 border-2 border-white" style={{ backgroundColor: '#171C2Eff' }}>
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
