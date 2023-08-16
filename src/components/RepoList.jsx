import React from 'react';
import { useNavigate } from 'react-router-dom';

const RepoList = ({ repos, setCurrRepo }) => {

  const navigate = useNavigate();

  const handleClickRepo = (repoName) => {
    setCurrRepo(repoName);
    console.log(repoName, 'clicked repo');
    navigate('/')
  };

  return (
    <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {repos?.map(repoName => (
        <li key={repoName.full_name} onClick={() => handleClickRepo(repoName.full_name)} className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          {repoName.name}
        </li>
      ))}
    </ul>
  );
};

export default RepoList;
