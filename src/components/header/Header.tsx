import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/images/expandedLogo.png";
import { Link } from "react-router-dom";
import { Button } from "antd";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));

  const hanldeLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <a href="/">
          <img src={logo} alt="Logo" />
        </a>
      </div>
      <input
        type="checkbox"
        id="menu-toggle"
        className={styles.menuToggle}
        checked={isMenuOpen}
        onChange={handleMenuToggle}
      />
      <label htmlFor="menu-toggle" className={styles.menuIcon}>
        ☰
      </label>
      <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ""}`}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/services">Services</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>

      {!isLogin ? (
        <div className={styles.authButtons}>
          <Link to="/login">
          <Button className={styles.loginBtn}>
            Login
          </Button>
          </Link>
          <Button className={styles.signupBtn}>Sign Up</Button>
        </div>
      ) : (
        <div>
          <Button onClick={hanldeLogout}>Logout</Button>
        </div>
      )}
    </header>
  );
};

export default Header;
