import React from 'react';
import GitHubLogo from '../icons/github-logo.png';
import '../login.css';

function LoginForm() {
  
  return (
    <div className="space-y-4">
      <h1 className="flex justify-center font-extrabold text-4xl font-serif mb-2" >Login</h1>
      <div className="mb-4 flex items-center justify-center">
        {/* <h1 htmlFor="username" className="block mb-2 text-sm font-medium text-gray-600">GitHub Username</h1> */}
        <input
          type="text"
          id="username"
          name="username"
          placeholder='GitHub Username'
          className="w-72 p-2 border rounded-md focus:outline-none focus:border-purple-500 border-black shadow-xl "
        />
      </div>

      <div className="mb-4 flex items-center justify-center p-2" >
        {/* <label htmlFor="repository" className="block mb-2 text-sm font-medium text-gray-600">Repository Name</label> */}
        <input
          type="text"
          id="repository"
          name="repository"
          placeholder='Repository Name'
          className="w-72 p-2 border rounded-md focus:outline-none focus:border-purple-500 border-black shadow-xl "
        />
      </div>

      <div className='flex justify-center items-center '>
        <button className=" mt-4 w-72 bg-violet-500 hover:bg-purple-600 text-white py-2 rounded focus:outline-none">
        Submit
      </button>
      </div>
      
      <div className='flex justify-center items-center'>
        <button className="mt-4 w-72 flex justify-center items-center bg-gray-800 hover:bg-gray-900 text-white py-2 rounded focus:outline-none">
        <img src={GitHubLogo} alt="GitHub Logo" className="h-5 w-5 mr-2" /> Login with GitHub
      </button>
      </div>
      
    </div>
  );
}

export default LoginForm;
