import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/Footer/Footer"; // Make sure the path is correct
import { Outlet } from "react-router-dom";
import styles from "./HomeLayout.module.scss"; // Import styles correctly

const MainPageLayout = () => {
  return (
    <>
      <Header />
      <div className={styles.mainContentWrapper}>
        <div className={styles.mainContent}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainPageLayout;