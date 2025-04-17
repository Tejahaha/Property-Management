import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">Property Management</Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/sites" className="nav-link">Sites</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <Link to="/settings" className="nav-link">Settings</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;