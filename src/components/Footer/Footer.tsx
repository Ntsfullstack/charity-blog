import React from "react";
import styles from "./footer.module.scss";
import logo from "../../assets/images/Logo.png";
import { Input } from "antd";

const { Search } = Input;

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.column}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Company Logo" className={styles.logo} />
          <p className={styles.companyName}>CÔNG TY ĐẤU GIÁ HỢP DANH BẢO PHONG</p>
        </div>
      </div>
      <div className={styles.column}>
        <h3>Liên hệ</h3>
        <ul className={styles.contactInfo}>
          <li>Hotline: 024.6272.2468</li>
          <li>Hotline: 0984.135.369</li>
          <li>Email: <a href="mailto:daugiabaophong@gmail.com">daugiabaophong@gmail.com</a></li>
          <li>Địa chỉ: Tầng 5, số 167 An Trạch, P. Ô Chợ Dừa, Q. Đống Đa, TP. Hà Nội</li>
        </ul>
      </div>
      <div className={styles.column}>
        <div className={styles.inputContainer}>
          <Search placeholder="Nhập email của bạn" enterButton="Đăng ký" size="large" />
          <p className={styles.subscribeText}>Đăng ký để nhận thông tin mới nhất từ chúng tôi</p>
        </div>
      </div>
      {/* <div className={styles.copyRight}>
        &copy; 2024 Inferno - All rights reserved || Designed By: Zilong
      </div> */}
    </footer>
  );
};

export default Footer;
