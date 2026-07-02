import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    setLoading(true);

    try {
      const response = await apiClient.post('/register', form);
      window.localStorage.setItem('fd-token', response.data.token);
      navigate('/home');
    } catch (error) {
      setStatus(error.response?.data?.message || 'Unable to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="form-card">
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full name
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            minLength={8}
            required
          />
        </label>
        <button type="submit" className="primary" disabled={loading}>
          {loading ? 'Creating account…' : 'Register'}
        </button>
      </form>
      {status && <p className="error">{status}</p>}
    </section>
  );
};

export default Register;
