// src/pages/Register.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../features/auth/authSlice';

const RegisterLogin: React.FC = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        const response = await axios.post('http://localhost:5000/api/users/register', {
          username,
          email,
          password,
        });
        dispatch(loginSuccess(response.data.token)); // Simulate login
        setMessage('Registration successful');
        navigate('/preferences');
      } else {
        const response = await axios.post('http://localhost:5000/api/users/login', {
          email,
          password,
        });
        dispatch(loginSuccess(response.data.token));
        setMessage('Login successful');
        navigate('/preferences');
      }
    } catch (error: any) {
      setMessage(error.response.data.message || 'An error occurred');
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">{isRegister ? 'User Registration' : 'User Login'}</h1>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <div className="mt-3">
        <button className="btn btn-secondary" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
};

export default RegisterLogin;
