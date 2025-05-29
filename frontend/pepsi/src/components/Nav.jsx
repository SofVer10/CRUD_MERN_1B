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
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/clients" className="nav-link">
            Clients
          </Link>
          <Link to="/locals" className="nav-link">
            Locals
          </Link>
          <Link to="/products" className="nav-link">
            Products
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Nav;