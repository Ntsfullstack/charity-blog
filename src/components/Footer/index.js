import React from "react";
import "./footer.scss";
import logo from "./LOGO.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-brand-wrapper">
            <Link to="./" className="logo">
              <img src={logo} alt="Zilong logo" />
            </Link>
            <ul className="footer-list">
              <li>
                <a href="./index.html" className="footer-link">Home</a>
              </li>
              <li>
                <a href="#" className="footer-link">Movie</a>
              </li>
              <li>
                <a href="#" className="footer-link">TV Show</a>
              </li>
              <li>
                <a href="#" className="footer-link">Web Series</a>
              </li>
              <li>
                <a href="#" className="footer-link">Pricing</a>
              </li>
            </ul>
          </div>
          <div className="divider" />
          <div className="quicklink-wrapper">
            <ul className="quicklink-list">
              <li>
                <a href="#" className="quicklink-link">Faq</a>
              </li>
              <li>
                <a href="#" className="quicklink-link">Help center</a>
              </li>
              <li>
                <a href="#" className="quicklink-link">Terms of use</a>
              </li>
              <li>
                <a href="#" className="quicklink-link">Privacy</a>
              </li>
            </ul>
            <ul className="social-list">
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-facebook" />
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-twitter" />
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-pinterest" />
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-linkedin" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
     
    </footer>
  );
};

export default Footer;
