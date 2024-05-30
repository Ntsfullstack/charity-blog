
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { ReactNode } from "react";
import style from "./HomeLayout.module.scss";
interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <>
      <div className="flex flex-col w-full background  relative">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default HomeLayout;
