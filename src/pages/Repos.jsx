import React from 'react'
import RepoList from '../components/RepoList';
import '../login.css';
import DateRangeToolbar from '../components/DateRangeToolbar';

const Repos = ({repos, setCurrRepo}) => {
  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-gray-400 p-6 rounded-lg shadow-md w-96">
        <RepoList repos={repos} setCurrRepo={setCurrRepo} />
      </div>
    </div>
  );
}

export default Repos