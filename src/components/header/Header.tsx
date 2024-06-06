// src/Header.js
import React from 'react';
import './style.scss';
import logo from './LOGO.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <a href="/"><img src={logo} alt="Logo"></img></a>
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
        <Link to='/login' className="login-btn">Login</Link>
        <button className="signup-btn">Sign Up</button>
      </div>
    </header>
  );
}

export default Header;
