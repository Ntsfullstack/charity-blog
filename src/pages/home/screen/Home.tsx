import React from "react";
import AboutUs from "../components/about_us/about_us";
import Field from "../components/field/field";
import styles from "./Home.module.scss";
import banner from "../../../assets/images/banner.jpg";
import RelatedArticles from "../components/news/news";
import ImageLibrary from "../components/library_image/album";

const MainPage: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      <header className={styles.banner}>
        <img src={banner} alt="Banner" />
      </header>
      <main className={styles.content}>
        <RelatedArticles currentArticleId={"6664899209d3c73791d3c333"} />
        <Field />
        <AboutUs />
        <ImageLibrary />
      </main>
    </div>
  );
};

export default MainPage;
