import React, { useState, useEffect } from "react";
import { Menu, Button, Dropdown, Avatar } from "antd";
import {
  MenuOutlined,
  SearchOutlined,
  CloseOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { logout } from "../../redux-setup/redux";
import logo from "../../assets/images/expandedLogo.png";
import { searchBlog } from "../../server/api";
import styles from "./Header.module.scss";
import { MenuInfo } from "rc-menu/lib/interface";

const { SubMenu } = Menu;

interface MenuItem {
  key: string;
  label: string;
  children?: MenuItem[];
}

const Header: React.FC = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
  const [searchText, setSearchText] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuActive(!isMenuActive);

  const handleLogout = () => {
    dispatch(logout());
    setIsLogin(false);
    navigate("/");
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();

      try {
        if (!searchText || !searchText.trim()) return;
        const data = await searchBlog(searchText);
        navigate(`/search/${searchText}`, { state: { data } });
      } catch (error) {
        console.error("Error searching:", error);
      }
      setIsSearchActive(false);
      setSearchText("");
    }
  };

  const handleDesktopMenuClick = ({ key }: MenuInfo) => {
    navigate(key as string);
  };

  const handleMobileMenuClick = ({ key }: MenuInfo) => {
    const item = findMenuItem(menuItems, key as string);
    if (item && !item.children) {
      navigate(key as string);
      setIsMenuActive(false);
    } else if (item && item.children) {
      setOpenKeys((prevKeys) =>
        prevKeys.includes(key as string)
          ? prevKeys.filter((k) => k !== key)
          : [...prevKeys, key as string]
      );
    }
  };

  const findMenuItem = (items: MenuItem[], key: string): MenuItem | null => {
    for (const item of items) {
      if (item.key === key) return item;
      if (item.children) {
        const found = findMenuItem(item.children, key);
        if (found) return found;
      }
    }
    return null;
  };

  const menuItems: MenuItem[] = [
    { key: "/", label: t("home") },
    {
      key: "about",
      label: t("about"),
      children: [
        { key: "/vision", label: t("vision-mission") },
        { key: "/letter", label: t("open letter") },
      ],
    },
    {
      key: "news",
      label: t("news"),
      children: [
        { key: "/su-kien", label: t("event") },
        { key: "/thong-cao-bao-chi", label: t("communication, journalism") },
      ],
    },
    {
      key: "activities",
      label: t("activity"),
      children: [
        { key: "/Activity", label: t("volunteer") },
        { key: "/suc-khoe-cong-dong", label: t("health") },
        { key: "/an-sinh-xa-hoi", label: t("social security") },
        { key: "/hoat-dong-tai-tro", label: t("sponsor") },
      ],
    },
    { key: "/contact", label: t("contact") },
  ];

  const renderMenuItem = (item: MenuItem) => {
    if (item.children) {
      return (
        <SubMenu
          key={item.key}
          title={item.label}
          onTitleClick={() =>
            handleMobileMenuClick({ key: item.key } as MenuInfo)
          }
        >
          {item.children.map(renderMenuItem)}
        </SubMenu>
      );
    }
    return <Menu.Item key={item.key}>{item.label}</Menu.Item>;
  };

  const renderMenu = (mode: "horizontal" | "vertical") => (
    <Menu
      mode={mode}
      onClick={
        mode === "horizontal" ? handleDesktopMenuClick : handleMobileMenuClick
      }
      openKeys={mode === "vertical" ? openKeys : undefined}
      onOpenChange={
        mode === "vertical" ? (keys: string[]) => setOpenKeys(keys) : undefined
      }
      className={mode === "vertical" ? styles.mobileMenu : ""}
      selectedKeys={[]}
    >
      {menuItems.map(renderMenuItem)}
    </Menu>
  );

  const handleSearch = async () => {
    try {
      if (!searchText || !searchText.trim()) return;
      const data = await searchBlog(searchText);
      navigate(`/search/${searchText}`, { state: { data } });
    } catch (error) {
      console.error("Error searching:", error);
    }
    setIsSearchActive(false);
    setSearchText("");
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Logo" />
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>{renderMenu("horizontal")}</nav>

        <div className={styles.headerActions}>
          <button
            className={styles.searchButton}
            onClick={() => setIsSearchActive(true)}
          >
            <SearchOutlined />
          </button>

          {isLogin ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "settings",
                    label: t("Settings"),
                    onClick: () => navigate("/auth/manager-blog"),
                  },
                  {
                    key: "logout",
                    label: t("Logout"),
                    danger: true,
                    onClick: handleLogout,
                  },
                ],
              }}
              trigger={["click"]}
            >
              <Avatar icon={<UserOutlined />} />
            </Dropdown>
          ) : (
            <Link to="/login">
              <Button type="primary">{t("Login")}</Button>
            </Link>
          )}

          <button className={styles.menuToggle} onClick={toggleMenu}>
            {isMenuActive ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`${styles.mobileNavOverlay} ${
          isMenuActive ? styles.active : ""
        }`}
      >
        <button className={styles.closeMenu} onClick={toggleMenu}>
          <CloseOutlined />
        </button>
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={menuItems}
          onClick={handleMobileMenuClick}
          className={styles.fullTextMenu}
        />
      </div>

      {/* Search Overlay */}
      {isSearchActive && (
        <div className={styles.searchOverlay}>
          <div className={styles.searchInputContainer}>
            <input
              type="text"
              placeholder={t("search")}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>
              <SearchOutlined />
            </button>
          </div>
          <button
            className={styles.closeSearch}
            onClick={() => setIsSearchActive(false)}
          >
            <CloseOutlined />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
