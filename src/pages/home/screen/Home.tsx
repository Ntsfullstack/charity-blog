import React from "react";
import AboutUs from "../components/about_us/about_us";
import Field from "../components/field/field";
import styles from "./Home.module.scss";

import banner from "../../../assets/images/banner.jpg";
import RelatedArticles from "../components/news/news";



const MainPage: React.FC = () => {
  return (
    <body>
      <img src={banner} alt="Banner" />
      <div className={styles.container}>
        <RelatedArticles currentArticleId={"667c3f45ead2382f5e6ff145"}/>
        {/* <News /> */}
        <Field />
        <AboutUs />
      </div>
    </body>
  );
};

export default MainPage;
