import './Login.css';
import React, { useState } from 'react';
import axios from 'axios'; // or from ../services/api if you've set that up
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Save token to localStorage
      localStorage.setItem('token', res.data.token);

      // Redirect to dashboard or wherever
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: { padding: '2rem', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px', margin: '0 auto' },
  input: { padding: '10px', fontSize: '16px' },
  button: { padding: '10px', background: '#2da0a8', color: '#fff', border: 'none', borderRadius: '5px' },
};

export default Login;



