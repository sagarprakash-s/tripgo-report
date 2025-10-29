import React, { useState } from 'react';
import axios from 'axios';

function Signup({ switchToLogin }) {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...submitData } = form;
      await axios.post('http://localhost:8080/api/auth/register', submitData);
      setSuccess('Account created successfully! Please login.');
      setForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phoneNumber: ''
      });
      setTimeout(() => switchToLogin(), 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form signup-form">
        <div className="auth-header">
          <h2>🚌 Create Bus Booking Account</h2>
          <p>Join us and start booking your bus tickets easily</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input
                name="fullName"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Username</label>
              <input
                name="username"
                placeholder="Choose a username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Phone Number</label>
              <input
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={form.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <span className="auth-link" onClick={switchToLogin}>
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;