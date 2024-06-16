import React from "react";
import styles from "./Footer.module.scss";
import logo from "../../assets/images/collapsedLogo.png";
import {
  FacebookFilled,
  TwitchOutlined,
  LinkedinFilled,
  YoutubeFilled,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer}>
        <div className={styles.row}>
          <ul className={styles.social_icons}>
            <li>
              <a className={styles.facebook} href="#">
                <FacebookFilled />
              </a>
            </li>
            <li>
              <a className={styles.twitter} href="#">
                <TwitchOutlined />
              </a>
            </li>
            <li>
              <a className={styles.youtube} href="#">
                <YoutubeFilled />
              </a>
            </li>
            <li>
              <a className={styles.linkedin} href="#">
                <LinkedinFilled />
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.row}>
          <ul>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">Our Services</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms &amp; Conditions</a>
            </li>
            <li>
              <a href="#">Career</a>
            </li>
          </ul>
        </div>
        <div className={styles.row}>
          INFERNO Copyright © 2024 Inferno - All rights reserved || Designed By:
          Zilong
        </div>
      </div>
    </footer>
  );
};

export default Footer;
