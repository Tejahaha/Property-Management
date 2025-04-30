import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const jwtToken = localStorage.getItem('jwtToken');

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">Property Management</Link>
        <div className="navbar-links">
          <Link to="/sites" className="nav-link">Sites</Link>
          <Link to="/all-properties" className="nav-link">All Properties</Link>
          <Link to="/settings" className="nav-link">Settings</Link>
          {!jwtToken && <Link to="/login" className="nav-link hover:underline transition duration-300">Login</Link>}
          {!jwtToken && <Link to="/signup" className="nav-link hover:underline transition duration-300">Sign Up</Link>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;