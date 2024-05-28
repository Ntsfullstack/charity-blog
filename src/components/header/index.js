// src/Header.js
import React from 'react';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <a href="/">MyLogo</a>
      </div>
      <nav className="nav">
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </header>
  );
}

export default Header;
