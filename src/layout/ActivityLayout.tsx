import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/Footer/Footer"; // Make sure the path is correct
import { Outlet } from "react-router-dom";
import styles from "./HomeLayout.module.scss"; // Import styles correctly
import Banner from "../components/banner/Banner";

const Activity = () => {
  return (
    <>
      <Header />
      <div className={styles.mainContentWrapper}>
        {/* <Banner /> */}
        <div className={styles.mainContent}>
          <Outlet />
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Activity;
