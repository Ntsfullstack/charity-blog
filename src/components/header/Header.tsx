import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/images/expandedLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown, Space } from "antd";
import {
  LoginOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../redux-setup/redux";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
  const [openDropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setIsLogin(false);
    window.location.reload();
  };

  const items = [
    {
      label: "Thay thông tin",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "Trang cài đặt",
      key: "2",
      icon: <SettingOutlined />,
      onClick: () => {
        navigate("/auth/manager-blog");
      },
    },
    {
      label: "Đăng xuất",
      key: "3",
      icon: <LoginOutlined />,  
      danger: true,
      onClick: handleLogout,
    },
  ];

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
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
        onChange={handleMenuClick}
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

      {isLogin ? (
        <div className={styles.modal_container}>
          <Dropdown menu={menuProps} overlayClassName={styles.dropdown}>
            <div className={styles.logout_button}>
              <img
                src="https://placehold.co/50x50"
                alt="User Avatar"
                onClick={() => setDropdown(!openDropdown)}
              />
            </div>
          </Dropdown>
        </div>
      ) : (
        <div className={styles.authButtons}>
          <Link to="/login">
            <Button className={styles.loginBtn}>Login</Button>
          </Link>
          <Button className={styles.signupBtn}>Sign Up</Button>
        </div>
      )}
    </header>
  );
};

export default Header;
