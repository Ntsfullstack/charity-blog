import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Switch from "antd/lib/switch";
import { Button, Popover } from "antd";
import logo from "./LOGO.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const headerRef = useRef(null);
  const navbarRef = useRef(null);
  const overlayRef = useRef(null);
  const navOpenBtnRef = useRef(null);

  const hide = () => {
    setClicked(false);
  };

  const handleClickChange = (open) => {
    setClicked(open);
  };

  const handleDropdown = () => {
    const dropdown = document.getElementById("dropdown");
    dropdown.classList.toggle("show");
  };

  const handleNavClick = () => {
    navbarRef.current.classList.toggle("active");
    overlayRef.current.classList.toggle("active");
    document.body.classList.toggle("active");
  };

  useEffect(() => {
    const header = headerRef.current;
    window.addEventListener("scroll", function () {
      window.scrollY >= 10
        ? header.classList.add("active")
        : header.classList.remove("active");
    });
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const clickContent = (
    <div className="favContent">
      <div className="d-flex justify-content-center">
        <h6 className="text-center">
          Please login to see your favorite movies
        </h6>
      </div>
    </div>
  );

  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="overlay" ref={overlayRef} onClick={handleNavClick} />
        <Link to="/" className="logo">
          <img src={logo} alt="zilong" />
        </Link>
        <div className="header-actions">
          <button className="search-btn">
            <ion-icon name="search-outline" />
          </button>
          <div className="lang-wrapper">
            <label htmlFor="language">
              <ion-icon name="globe-outline" />
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

        <nav className="navbar" ref={navbarRef}>
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
              <Popover
                content={
                  <div>
                    {clickContent}
                    <a onClick={hide} className="btn btn-danger mt-4 l-5">
                      Close
                    </a>
                  </div>
                }
                trigger="click"
                open={clicked}
                onOpenChange={handleClickChange}
              >
                <Button className="btn btn-outline-primary">Favorite</Button>
              </Popover>
            </li>
          </ul>
        </nav>
        <button
          className="menu-open-btn"
          onClick={handleNavClick}
          ref={navOpenBtnRef}
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
