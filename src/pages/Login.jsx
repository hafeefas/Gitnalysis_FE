import React from 'react';
import LoginForm from '../components/LoginForm';
import '../login.css';
function Login() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <div className="border shadow-xl rounded-md bg-gray-400 p-4 py-6 px-4 my-2 mb-2 border-black flex flex-col items-center"
        style={{ width: "400px", height: "400px" }}>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
