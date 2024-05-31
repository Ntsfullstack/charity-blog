
import Footer from "../components/Footer";
import React, { ReactNode } from "react";
import Header from "../components/header/Header";
import style from "./HomeLayout.module.scss";
interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <>
    <Header/>
      <div className="flex flex-col w-full background  relative">
        <div className="fixed top-0 left-0 right-0 z-50">
        </div>
        <div className="flex-1">{children}</div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default HomeLayout;
