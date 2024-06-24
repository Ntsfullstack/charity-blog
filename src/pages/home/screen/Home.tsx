import React from "react";
import AboutUs from "../components/about_us/about_us";
import Field from "../components/field/field";
import styles from "./Home.module.scss";
import News from "../components/news/news";
import banner from "../../../assets/images/banner.jpg";

const MainPage: React.FC = () => {
  return (
    <body>
      <img src={banner} alt="Banner" />
      <div className={styles.container}>
        <News />
        <Field />
        <AboutUs />
      </div>
    </body>
  );
};

export default MainPage;
