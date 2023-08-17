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

    return (
    );
}

export default Branches;
