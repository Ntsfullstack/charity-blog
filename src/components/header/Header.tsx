import React, { useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import { Avatar, Button, Dropdown, Menu } from "antd";
import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux-setup/redux";
import logo from "../../assets/images/expandedLogo.png";
import clsx from "clsx";
import { searchBlog } from "../../server/api";
import SearchPost from "../../pages/SeachPost/SearchPost";
const DropdownMenu = () => {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
  const [openDropdown, setDropdown] = useState(false);
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [isNavOpen, setNavOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        navigate(`/search/${searchText}`, { state: { data } }); // Update URL on Enter press
      } catch (error) {
        console.error("Error searching:", error);
        // Handle error if necessary
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

  const handleLogout = () => {
    console.log("hi");
    dispatch(logout());
    setIsLogin(false);
    window.location.reload();
  };

  const handleAvatar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDropdown(!openDropdown);
  };

  const items = [
    {
      label: "Trang cài đặt",
      key: "1",
      onClick: () => {
        navigate("/auth/manager-blog");
      },
    },
    {
      label: "Đăng xuất",
      key: "2",
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
  const itemsNav: any = [
    {
      key: isLogin ? "/auth/manager-blog" : "/login",
      label: isLogin ? (
        <div
          onClick={() => {
            navigate("/auth/manager-blog");
          }}
        >
          Trang Đăng Bài
        </div>
      ) : (
        <div
          onClick={() => {
            navigate("/login");
          }}
        >
          Đăng Nhập
        </div>
      ),
    },
    {
      key: "/",
      label: "Trang chủ",
    },
    {
      key: "about",
      label: "Giới Thiệu",
      children: [
        {
          key: "vision",
          label: "Tầm Nhìn, Sứ Mệnh",
        },
        { key: "letter", label: "Thư Ngỏ" },
        { key: "history", label: "Lịch sử" },
        { key: "contact", label: "Liên Hệ" },
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

  const menuGioiThieu = (
    <Menu>
      <Menu.Item>
        <Link to="/about/vision" className={styles.dropdown_link_title}>
          Tầm nhìn, sứ mệnh
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/about/letter" className={styles.dropdown_link}>
          Thư ngỏ
        </Link>
      </Menu.Item>

      <Menu.Item>
        <Link to="/about/contact" className={styles.dropdown_link_title}>
          Liên hệ
        </Link>
      </Menu.Item>
    </Menu>
  );

  const menuTinTuc = (
    <Menu>
      <Menu.Item>
        <Link to="/MainPage" className={styles.dropdown_link_title}>
          Tin tức - sự kiện
        </Link>
      </Menu.Item>

      <Menu.Item>
        <Link className={styles.dropdown_link} to="/thong-cao-bao-chi">
          Thông cáo, báo chí
        </Link>
      </Menu.Item>
    </Menu>
  );

  // const menuHoatDong = (
  //   <Menu>
  //     <Menu.Item>
  //       <Link to="/Volunteer" className={styles.dropdown_link_title}>
  //         Thiện Nguyện
  //       </Link>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <Link className={styles.dropdown_link} to="/branding">
  //         Chăm sóc sức khỏe cộng đồng
  //       </Link>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <Link className={styles.dropdown_link} to="/illustrations">
  //         Hỗ trợ sinh kế
  //       </Link>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <Link to="/photography" className={styles.dropdown_link_title}>
  //         An sinh xã hội
  //       </Link>
  //     </Menu.Item>
  //   </Menu>
  // );

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };
  return (
    <div>
      <header id="nav_menu">
        <div className={clsx(styles.container, cls)}>
          <div className={styles.nav_start}>
            {!showSearch && (
              <div className={styles.logo}>
                <Link to="/">
                  <img src={logo} alt="Logo" />
                </Link>
              </div>
            )}
            <input
              type="checkbox"
              id="menu-toggle"
              className={styles.menuToggle}
              checked={isNavOpen}
              onChange={toggleNav}
            />
            <label htmlFor="menu-toggle" className={styles.menuIcon}>
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <path
                  fill="#000000"
                  fillRule="evenodd"
                  d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"
                />
              </svg>
            </label>
            <button className={styles.closeButton} onClick={closeNav}>
              <CloseOutlined />
            </button>
            <nav className={styles.menu}>
              {width > 768 ? (
                <ul className={styles.menu_bar}>
                  <li>
                    <Link to="/" className={styles.dropdown_link_title}>
                      TRANG CHỦ
                    </Link>
                  </li>
                  <li>
                    <Dropdown overlay={menuGioiThieu}>
                      <Button className={clsx(styles.nav_link, styles.work)}>
                        GIỚI THIỆU
                      </Button>
                    </Dropdown>
                  </li>
                  <li>
                    <Dropdown overlay={menuTinTuc}>
                      <Button
                        className={clsx(styles.nav_link, styles.discover)}
                      >
                        TIN TỨC
                      </Button>
                    </Dropdown>
                  </li>
                  <li>
                    <Button className={clsx(styles.nav_link, styles.work)}>
                      HOẠT ĐỘNG Tài TrỢ
                    </Button>
                  </li>
                </ul>
              ) : (
                <div className={styles.navbar}>
                  <Menu
                    defaultSelectedKeys={["1"]}
                    mode="inline"
                    items={itemsNav}
                    onClick={handleMenuClick}
                  />
                </div>
              )}
            </nav>
          </div>
          <div className={styles.nav_end}>
            <div className={styles.right_container}>
              {width < 480 ? (
                <form className={styles.search} role="search">
                  <p
                    className={styles.iconSearch}
                    onClick={() => {
                      setShowSearch(!showSearch);
                    }}
                  >
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="15px"
                      height="15px"
                      viewBox="0 0 612.01 612.01"
                      xmlSpace="preserve"
                    >
                      <g>
                        <g id="_x34__4_">
                          <g>
                            <path
                              d="M606.209,578.714L448.198,423.228C489.576,378.272,515,318.817,515,253.393C514.98,113.439,399.704,0,257.493,0
				C115.282,0,0.006,113.439,0.006,253.393s115.276,253.393,257.487,253.393c61.445,0,117.801-21.253,162.068-56.586
				l158.624,156.099c7.729,7.614,20.277,7.614,28.006,0C613.938,598.686,613.938,586.328,606.209,578.714z M257.493,467.8
				c-120.326,0-217.869-95.993-217.869-214.407S137.167,38.986,257.493,38.986c120.327,0,217.869,95.993,217.869,214.407
				S377.82,467.8,257.493,467.8z"
                            />
                          </g>
                        </g>
                      </g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                    </svg>
                  </p>
                  {showSearch && (
                    <input
                      type="text"
                      name="search"
                      placeholder="Search"
                      className={styles.searchMobile}
                      onChange={(e) => setSearchText(e.target.value)} // Cập nhật ref khi có thay đổi từ input
                      onKeyDown={(e) => handleKeyDown(e, searchText)}
                    />
                  )}
                </form>
              ) : (
                <form className={styles.search} role="search">
                  <p className={styles.iconSearch}>
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="15px"
                      height="15px"
                      viewBox="0 0 612.01 612.01"
                      xmlSpace="preserve"
                    >
                      <g>
                        <g id="_x34__4_">
                          <g>
                            <path
                              d="M606.209,578.714L448.198,423.228C489.576,378.272,515,318.817,515,253.393C514.98,113.439,399.704,0,257.493,0
C115.282,0,0.006,113.439,0.006,253.393s115.276,253.393,257.487,253.393c61.445,0,117.801-21.253,162.068-56.586
l158.624,156.099c7.729,7.614,20.277,7.614,28.006,0C613.938,598.686,613.938,586.328,606.209,578.714z M257.493,467.8
c-120.326,0-217.869-95.993-217.869-214.407S137.167,38.986,257.493,38.986c120.327,0,217.869,95.993,217.869,214.407
S377.82,467.8,257.493,467.8z"
                            />
                          </g>
                        </g>
                      </g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                    </svg>
                  </p>
                  <input
                    type="text"
                    name="search"
                    placeholder="Search"
                    onChange={(e) => setSearchText(e.target.value)} // Cập nhật ref khi có thay đổi từ input
                    onKeyDown={(e) => handleKeyDown(e, searchText)}
                  />
                </form>
              )}
            </div>
            {isNavOpen && (
              <div className={styles.overlay} onClick={closeNav}></div>
            )}
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
                        onClick={(e) => {
                          handleAvatar(e);
                        }}
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
          </div>
        </div>
      </header>
    </div>
  );
};

export default DropdownMenu;
