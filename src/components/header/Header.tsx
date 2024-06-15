import React, { useState } from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/images/expandedLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown, Menu } from "antd";
import {
  LoginOutlined,
  SettingOutlined,
  UserOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../redux-setup/redux";

const Header = () => {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
  const [openDropdown, setDropdown] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false); // State to manage nav open/close
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setIsLogin(false);
    window.location.reload();
  };

  const items = [
    {
      label: "Trang cài đặt",
      key: "1",
      icon: <SettingOutlined />,
      onClick: () => {
        navigate("/auth/manager-blog");
      },
    },
    {
      label: "Đăng xuất",
      key: "2",
      icon: <LoginOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  const menuProps = {
    items,
  };

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setNavOpen(false);
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
        checked={isNavOpen}
        onChange={toggleNav}
      />
      <label htmlFor="menu-toggle" className={styles.menuIcon}>
        ☰
      </label>
      <nav className={`${styles.nav} ${isNavOpen ? styles.open : ""}`}>
        {/* <button className={styles.closeButton} onClick={closeNav}>
          <CloseOutlined />
        </button> */}
        <ul>
          <li>
            <a href="/">TRANG CHỦ</a>
          </li>
          <li className={styles.dropdownLi}>
            <a href="/services">GIỚI THIỆU</a>
            <div className={styles.dropdownContent}>
              <a href="/about-us">Tầm nhìn, sứ mệnh</a>
              <a href="/about-us">Thư ngỏ</a>
              {/* Add more dropdown items here */}
            </div>
          </li>
          <li>
            <a href="/contact">TIN TỨC</a>
            <div className={styles.dropdownContent}>
              <a href="/about-us">Tin tức, sự kiện</a>
              <a href="/about-us">Thông cáo báo chí</a>
              {/* Add more dropdown items here */}
            </div>
          </li>
          {/* Dropdown for "About" */}
          <li className={styles.dropdownLi}>
            <a href="/about">LIÊN HỆ</a>
            <div className={styles.dropdownContent}>
              <a href="/about-us">Về chúng tôi</a>
              {/* Add more dropdown items here */}
            </div>
          </li>
        </ul>
      </nav>
      {isNavOpen && <div className={styles.overlay} onClick={closeNav}></div>}
      <div className={styles.login}>
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
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
