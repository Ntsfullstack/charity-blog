import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/Footer/Footer"; // Make sure the path is correct
import { Outlet, useLocation } from "react-router-dom";
import styles from "./HomeLayout.module.scss"; // Import styles correctly
import SideChildPage from "../components/SiderChildPage/SideChildPage";
import Banner from "../components/banner/Banner";
const PageChildLayout = () => {
  const location = useLocation();
  console.log(location, location.pathname);
  const categories = [
    { name: "VĂN HÓA GIÁO DỤC", path: "/Activity" },
    { name: "CHĂM SÓC SỨC KHỎE CỘNG ĐỒNG", path: "/suc-khoe-cong-dong" },
    { name: "HỖ TRỢ SINH KẾ", path: "/ho-tro-sinh-ke" },
    { name: "AN SINH XÃ HỘI", path: "/an-sinh-xa-hoi" },
  ];

  return (
    <>
      <Header />
      <div className={styles.mainContentWrapper}>
        <Banner />
        <div className={styles.mainContent}>
          <SideChildPage categories={categories} />
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PageChildLayout;
