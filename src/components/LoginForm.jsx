import React from 'react';
import GitHubLogo from '../icons/github-logo.png';
import '../login.css';
import { authenticateWithGitHub } from '../services/githubLogin.js'
import { useLocation } from 'react-router-dom';

function LoginForm() {

  const handleLoginWithGitHubClick = () => {
    console.log('handled')
    window.open(`${process.env.REACT_APP_BACKEND_URL}/github/auth`,'_self')
  }

  return (
    <form className="space-y-4">
      <div className="mb-4">
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-600">GitHub Username</label>
        <input
          type="text"
          id="username"
          name="username"
          className="w-full p-2 border rounded focus:outline-none focus:border-purple-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="repository" className="block mb-2 text-sm font-medium text-gray-600">Repository Name</label>
        <input
          type="text"
          id="repository"
          name="repository"
          className="w-full p-2 border rounded focus:outline-none focus:border-purple-500"
        />
      </div>

      <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded focus:outline-none">
        Submit
      </button>

      <button className="w-full flex justify-center items-center bg-gray-800 hover:bg-gray-900 text-white py-2 rounded focus:outline-none"
        onClick={handleLoginWithGitHubClick}
        type="button">
        <img src={GitHubLogo} alt="GitHub Logo" className="h-5 w-5 mr-2" /> Login with GitHub
      </button>
    </form>
  );
}

export default LoginForm;
