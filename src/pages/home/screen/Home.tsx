import React from "react";
import AboutUs from "../components/about_us/about_us";
import Field from "../components/field/field";
import styles from "./Home.module.scss";
import banner from "../../../assets/images/banner.jpg";
import RelatedArticles from "../components/news/news";
import News from "../components/news/news";
import ImageLibrary from "../components/library_image/album";

const MainPage: React.FC = () => {
  return (
    <body>
      <img src={banner} alt="Banner" />
      <div className={styles.container}>
        <RelatedArticles currentArticleId={"6664899209d3c73791d3c333"} />
        {/* <News /> */}
        <Field />
        <AboutUs />
        <ImageLibrary />
      </div>
    </body>
  );
};

export default MainPage;
