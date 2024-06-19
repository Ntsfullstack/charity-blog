import React from "react";
import AboutUs from "../components/about_us/about_us";
import Field from "../components/field/field";
import styles from "./Main.module.scss";

const MainPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Field />
      <AboutUs />
    </div>
  );
};

export default MainPage;
