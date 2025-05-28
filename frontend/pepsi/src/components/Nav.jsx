import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/StyleNav.css';

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Pepsi
        </Link>
        
        <div className="nav-menu">
          <Link to="/clients" className="nav-link">
            Clients
          </Link>
          <Link to="/locals" className="nav-link">
            Locals
          </Link>
          <Link to="/products" className="nav-link">
            Products
          </Link>
          <Link to="/support" className="nav-link">
            Support
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </div>

        <Link to="/register" className="nav-register">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Nav;