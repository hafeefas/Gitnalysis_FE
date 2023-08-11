import React from 'react';
import GitHubLogo from '../icons/github-logo.png';

function LoginForm() {
  return (
    <div>
      <h2>GitHub Login</h2>
      
      <form>
        <div>
          <label htmlFor="username">GitHub Username</label>
          <input
            type="text"
            id="username"
            name="username"
          />
        </div>

        <div>
          <label htmlFor="repository">Repository Name</label>
          <input
            type="text"
            id="repository"
            name="repository"
          />
        </div>

        <button>
          <img src={GitHubLogo} alt="GitHub Logo" /> Login with GitHub
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

