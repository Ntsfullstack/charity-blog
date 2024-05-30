import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Switch from "antd/lib/switch";
import { Button, Popover } from "antd";


const Navbar = () => {



  return (
    <div className="header" >
      <div className="container">
        <div className="overlay" />
        <Link to="/" className="logo">
          
        </Link>
        <div className="header-actions">
          <button className="search-btn">
          </button>
          <div className="lang-wrapper">
            <label htmlFor="language">
            </label>
            <div className="Search">
              <Link to="/Search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width={24}
                  height={24}
                >
                  <path
                    d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit={10}
                    strokeWidth={32}
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeMiterlimit={10}
                    strokeWidth={32}
                    d="M338.29 338.29L448 448"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <Link to="/login" className="btn btn-primary">
            Sign in
          </Link>
        </div>

        <nav className="navbar">
          <ul className="navbar-list">
            <li>
              <Link to="/" className="navbar-link">
                Home
              </Link>
            </li>
            <li>
              <Switch checked={false} onChange={() => { }} />
            </li>
            <li>
            
            </li>
          </ul>
        </nav>
        <button
          className="menu-open-btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={24}
            height={24}
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeMiterlimit={10}
              strokeWidth={32}
              d="M80 160h352M80 256h352M80 352h352"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
