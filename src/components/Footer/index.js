import React from "react";
import "./footer.scss";
import logo from "./LOGO.png";
import style from './footer.module.scss'
import { Link } from "react_router_dom";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footer_top}>
        <div className={style.container}>
          <div className={style.footer_brand_wrapper}>
            <Link to="./" className={style.logo}>
              <img src={logo} alt="Zilong logo" />
            </Link>
            <ul className={style.footer_list}>
              <li>
                <a  className={style.footer_link}>Home</a>
              </li>
              <li>
                <a href="#" className={style.footer_link}>Movie</a>
              </li>
              <li>
                <a href="#" className={style.footer_link}>TV Show</a>
              </li>
              <li>
                <a href="#" className={style.footer_link}>Web Series</a>
              </li>
              <li>
                <a href="#" className={style.footer_link}>Pricing</a>
              </li>
            </ul>
          </div>
          <div className={style.divider} />
          <div className={style.quicklink_wrapper}>
            <ul className={style.quicklink_list}>
              <li>
                <a href="#" className={style.quicklink_link}>Faq</a>
              </li>
              <li>
                <a href="#" className={style.quicklink_link}>Help center</a>
              </li>
              <li>
                <a href="#" className={style.quicklink_link}>Terms of use</a>
              </li>
              <li>
                <a href="#" className={style.quicklink_link}>Privacy</a>
              </li>
            </ul>
            <ul className={style.social_list}>
              <li>
                <a href="#" className={style.social_link}>
                  <ion_icon name="logo_facebook" />
                </a>
              </li>
              <li>
                <a href="#" className={style.social_link}>
                  <ion_icon name="logo_twitter" />
                </a>
              </li>
              <li>
                <a href="#" className={style.social_link}>
                  <ion_icon name="logo_pinterest" />
                </a>
              </li>
              <li>
                <a href="#" className={style.social_link}>
                  <ion_icon name="logo_linkedin" />
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
