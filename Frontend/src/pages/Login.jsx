import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div>
    <div className="login-container">
      <h1 className="main-heading">Employee Management System</h1>
      <div className="login-card">
        <h2 className="login-title">Admin Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="login-input"
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="login-input"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="toggle-password-btn"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;

