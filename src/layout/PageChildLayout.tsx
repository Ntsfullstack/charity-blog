import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./HomeLayout.module.scss";
import SideChildPage from "../components/SiderChildPage/SideChildPage";
import Banner from "../components/banner/Banner";

const PageChildLayout = () => {
  const location = useLocation();
  console.log(location, location.pathname);

  const categories = [
    {
      name: " HOẠT ĐỘNG THIỆN NGUYỆN",
      path: "/Activity",
      id: "667bcecfec596a8638ebd2a9",
    },
    {
      name: "CHĂM SÓC SỨC KHỎE CỘNG ĐỒNG",
      path: "/suc-khoe-cong-dong",
      id: "667bcecfec596a8638ebd2a9",
    },
    {
      name: "AN SINH XÃ HỘI",
      path: "/an-sinh-xa-hoi",
      id: "66a608ca946444899fe7f459",
    },
    {
      name: "HOẠT ĐỘNG TÀI TRỢ",
      path: "/hoat-dong-tai-tro",
      id: "66a60905946444899fe7f45a",
    },
  ];

  return (
    <>
      <Banner />
      <div className={styles.mainContent}>
        <SideChildPage categories={categories} />
        <Outlet />
      </div>
    </>
  );
};

export default PageChildLayout;
