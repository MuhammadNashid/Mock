import React, { useState, } from 'react';
import axios from 'axios';
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/login', credentials);
      alert('Login successful');
    } catch (error) {
      alert('Login failed');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        value={credentials.email} 
        onChange={handleChange} 
      />
      <input 
        type="password" 
        name="password" 
        placeholder="Password" 
        value={credentials.password} 
        onChange={handleChange} 
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
