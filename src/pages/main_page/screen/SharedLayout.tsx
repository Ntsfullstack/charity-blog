import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import styles from "./MainPage.module.scss";
import Banner from "../../../components/banner/Banner";

const SharedLayout = () => {
  const location = useLocation();

  const categories = [
    { name: "TIN TỨC - SỰ KIỆN", path: "/MainPage" },
    { name: "TUYỂN DỤNG", path: "/tuyen-dung" },
    { name: "THÔNG CÁO BÁO CHÍ", path: "/thong-cao-bao-chi" }
  ];

  return (
    <div className={styles.mainContainer}>
      <Banner />
      <div className={styles.content}>
        <div className={styles.categoriesSidebar}>
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
  );
};

export default SharedLayout;