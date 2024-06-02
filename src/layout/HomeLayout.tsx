import React, { ReactNode } from "react";
import Header from "../components/header/Header";
import Banner from "../components/banner/Banner"; // Make sure the path is correct
import Footer from "../components/Footer/Footer"; // Make sure the path is correct

// import style from "./HomeLayout.module.scss";

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <>
      <Header />
      <Banner /> {/* Add the Banner component here */}
      <div className="flex flex-col w-full background relative">
        <div className="fixed top-0 left-0 right-0 z-50"></div>
        <div className="flex-1">{children}</div>
        <Footer />
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default HomeLayout;
