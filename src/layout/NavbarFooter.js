import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import React from "react";
import "./style.scss";

const NavbarFooter = ({ children }) => {
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

export default NavbarFooter;
