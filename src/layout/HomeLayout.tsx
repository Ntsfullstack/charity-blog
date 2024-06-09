import React, { ReactNode } from "react";
import Header from "../components/header/Header";
import Footer from "../components/Footer/Footer"; // Make sure the path is correct
import { Outlet } from "react-router-dom";
import style from "./HomeLayout.module.scss";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col w-full background relative">
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HomeLayout;
