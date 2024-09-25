import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import styles from "./MainPage.module.scss";
import Banner from "../../../components/banner/Banner";

const SharedLayout = () => {
  const location = useLocation();

  const categories = [
    { name: "TIN TỨC - SỰ KIỆN", path: "/MainPage" },
    { name: "TUYỂN DỤNG", path: "/tuyen-dung" }
  ];

  return (
    <div className={styles.mainContainer}>
      <Banner />
      <div className={styles.contentWrapper}>
        <h1 className={styles.mainTitle}>HOẠT ĐỘNG THIỆN NGUYỆN</h1>
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <ul>
              {categories.map((category) => (
                <li key={category.name}>
                  <div className={`${styles.categoryBox} ${location.pathname === category.path ? styles.active : ''}`}>
                    <a href={category.path}>{category.name}</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.mainContent}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedLayout;