import React from "react";
import AboutUs from "../components/about_us/about_us";
import Field from "../components/field/field";
import styles from "./Main.module.scss";
import News from "../components/news/news";

const MainPage: React.FC = () => {
  return (
    <body>
        <img src="http://quythientam.com/mediacenter//media/files/905/banners/882_1557802147_1705cda2ca32dbe2.jpg" alt="Banner" />
    <div className={styles.container}>
      
      <News />
      <Field />
      <AboutUs />
    </div>
    </body>

  );
};

export default MainPage;
