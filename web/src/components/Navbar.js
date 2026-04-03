// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <Link to="/upload" style={styles.link}>Upload</Link>
      <Link to="/dashboard" style={styles.link}>Dashboard</Link>
      <Link to="/login" style={styles.link}>Login</Link>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    padding: '1rem',
    backgroundColor: '#eee',
    marginBottom: '2rem'
  },
  link: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: 'black'
  }
};

export default Navbar;
