import React, { useEffect, useState, useRef, useCallback } from "react";
import styles from "./Header.module.scss";
import { Avatar, Button, Dropdown, Menu } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { logout } from "../../redux-setup/redux";
import logo from "../../assets/images/expandedLogo.png";
import useClickOutside from "./useClickOutside";
import { searchBlog } from "../../server/api";

const DropdownMenu: React.FC = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
  const [searchText, setSearchText] = useState("");
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { t, i18n } = useTranslation();
  const searchRef = useRef<HTMLFormElement>(null);

  const handleKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    searchText: string
  ) => {
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
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const moving = window.pageYOffset;
      setVisible(position > moving);
      setPosition(moving);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [position]);

  const cls = visible ? styles.visible : styles.hidden;

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY >= 85);
    const handleResize = () => {
      setWidth(window.innerWidth);
      if (window.innerWidth > 768) setIsMenuActive(false);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => setIsMenuActive(!isMenuActive);

  const handleLogout = () => {
    dispatch(logout());
    setIsLogin(false);
    window.location.reload();
  };

  const handleAvatar = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleSearch = () => {
    setIsSearchActive(true);
  };

  const handleCloseSearch = useCallback(() => {
    setIsSearchActive(false);
    setSearchText("");
  }, []);

  useClickOutside(searchRef, handleCloseSearch);

  const items = [
    {
      label: "Trang cài đặt",
      key: "1",
      onClick: () => navigate("/auth/manager-blog"),
    },
    {
      label: "Đăng xuất",
      key: "2",
      danger: true,
      onClick: handleLogout,
    },
  ];

  const menuProps = { items };

  const itemsNav = [
    {
      key: isLogin ? "/auth/manager-blog" : "/login",
      label: isLogin ? (
        <div onClick={() => navigate("/auth/manager-blog")}>Trang Đăng Bài</div>
      ) : (
        <div onClick={() => navigate("/login")}>Đăng Nhập</div>
      ),
    },
    {
      key: "about",
      label: "Giới Thiệu",
      children: [
        { key: "vision", label: "Tầm Nhìn, Sứ Mệnh" },
        { key: "letter", label: "Thư Ngỏ" },
        { key: "history", label: "Lịch sử" },
      ],
    },
    {
      key: "news",
      label: "Tin tức",
      children: [
        { key: "news-events", label: "Tin tức - sự kiện" },
        { key: "recruitment-volunteer", label: "Tuyển dụng , tình nguyện" },
        { key: "press-release", label: "Thông cáo , báo chí" },
      ],
    },
    {
      key: "activities",
      label: "Hoạt động",
      children: [
        { key: "culture-education", label: "Văn hóa giáo dục" },
        { key: "community-healthcare", label: "Chăm sóc sức khỏe cộng đồng" },
        { key: "economic-support", label: "Hỗ trợ kinh tế" },
        { key: "social-welfare", label: "An sinh xã hội" },
      ],
    },
    {
      key: "logout",
      label: "Đăng Xuất",
      danger: true,
      onClick: handleLogout,
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      handleLogout();
    } else {
      navigate(key);
    }
  };

  const renderMenu = (menuItems: any) => (
    <Menu>
      {menuItems.map((item: any) => (
        <Menu.Item key={item.key}>
          <Link to={item.key} className={styles.dropdown_link_title}>
            {t(item.label)}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  const menuGioiThieu = renderMenu([
    { key: "/vision", label: "vision-mission" },
    { key: "/letter", label: "open letter" },
  ]);

  const menuTinTuc = renderMenu([
    { key: "/MainPage", label: "event" },
    { key: "/thong-cao-bao-chi", label: "communication, journalism" },
  ]);

  const menuHoatDong = renderMenu([
    { key: "/Activity", label: "volunteer" },
    { key: "/suc-khoe-cong-dong", label: "health" },
    { key: "/an-sinh-xa-hoi", label: "social security" },
    { key: "/hoat-dong-tai-tro", label: "sponsor" },
  ]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className={clsx(styles.header, cls)} id="header">
      <div className={clsx(styles.logo)}>
        <Link to="/">
          <img src={logo} alt="Logo" width={100} height={100} />
        </Link>
      </div>
      <nav className={`${styles.navbar} ${styles.container}`}>
        {width > 768 ? (
          <ul className={styles.menu_bar}>
            <li>
              <Link to="/" className={clsx(styles.nav_link, styles.work)}>
                {t("home")}
              </Link>
            </li>
            <li>
              <Dropdown overlay={menuGioiThieu}>
                <div className={clsx(styles.nav_link, styles.work)}>
                  {t("about")}
                </div>
              </Dropdown>
            </li>
            <li>
              <Dropdown overlay={menuTinTuc}>
                <div className={clsx(styles.nav_link, styles.discover)}>
                  {t("news")}
                </div>
              </Dropdown>
            </li>
            <li>
              <Dropdown overlay={menuHoatDong}>
                <div className={clsx(styles.nav_link, styles.work)}>
                  {t("activity")}
                </div>
              </Dropdown>
            </li>
            <li className="contact">
              <div className={clsx(styles.nav_link, styles.work)}>
                {t("contact")}
              </div>
            </li>
          </ul>
        ) : (
          <>
            <div className={styles.burger} id="burger" onClick={toggleMenu}>
              <span className={styles.burgerLine}></span>
              <span className={styles.burgerLine}></span>
              <span className={styles.burgerLine}></span>
            </div>
            <div
              className={`${styles.menu} ${isMenuActive ? styles.active : ""}`}
              id="menu"
            >
              <Menu
                defaultSelectedKeys={["1"]}
                mode="inline"
                items={itemsNav}
                onClick={handleMenuClick}
              />
            </div>
          </>
        )}
      </nav>
      <form
        ref={searchRef}
        className={`${styles.search} ${isSearchActive ? styles.active : ""}`}
        role="search"
      >
        {isSearchActive ? (
          <>
            <input
              type="text"
              name="search"
              placeholder={t("search")}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, searchText)}
              className={styles.searchInput}
              autoFocus
            />
            <button type="button" className={styles.iconSearch}>
              <SearchOutlined />
            </button>
          </>
        ) : (
          <button
            type="button"
            className={styles.iconSearch}
            onClick={handleSearch}
          >
            <SearchOutlined />
          </button>
        )}
      </form>
      {width > 768 && (
        <div className={styles.login}>
          {isLogin ? (
            <div className={styles.modal_container}>
              <Dropdown
                menu={menuProps}
                trigger={["click"]}
                overlayClassName={styles.dropdown}
              >
                <button
                  onClick={handleAvatar}
                  style={{
                    border: "none",
                    background: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  <Avatar size={50} icon={<UserOutlined />} />
                </button>
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
      )}
    </header>
  );
};

export default DropdownMenu;