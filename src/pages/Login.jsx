import React from 'react';
import LoginForm from '../components/LoginForm';
import '../login.css';
function Login() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-gray-400 p-6 rounded-lg shadow-md w-96">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
