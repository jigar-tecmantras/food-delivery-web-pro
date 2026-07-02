import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    setLoading(true);

    try {
      const response = await apiClient.post('/login', credentials);
      window.localStorage.setItem('fd-token', response.data.token);
      navigate('/home');
    } catch (error) {
      setStatus(error.response?.data?.message || 'Unable to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="form-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            name="email"
            autoComplete="username"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="primary" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      {status && <p className="error">{status}</p>}
    </section>
  );
};

export default Login;
