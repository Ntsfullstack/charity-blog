import React from "react";
import styles from "./Footer.module.scss";
import logo from "../../assets/images/collapsedLogo.png";

const Footer = () => {
  return (
    <footer id="dk-footer" className={styles.Footer}>
      <div className={styles.copyright}> 
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.colMd6}>
              <span>Copyright © 2024, All Right Reserved </span>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
