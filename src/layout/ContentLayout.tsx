import React, { ReactNode } from "react";
import Header from "../components/header/Header";
import Footer from "../components/Footer/Footer"; // Make sure the path is correct

// import style from "./HomeLayout.module.scss";

interface ContentLayoutProps {
  children: ReactNode;
}

const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <>
      <Header />
      <div className="flex flex-col w-full background relative">
        <div className="fixed top-0 left-0 right-0 z-50"></div>
        <div className="flex-1">{children}</div>
        <Footer />
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default ContentLayout;
