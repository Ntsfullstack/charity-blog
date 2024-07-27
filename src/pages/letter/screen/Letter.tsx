import React from "react";
import styles from "./Letter.module.scss";
import AboutUs from "../components/about_us/about_us";
import Field from "../components/field/field";
import banner from "../../../assets/images/banner.jpg";
import RelatedArticles from "../components/news/news";
import News from "../components/news/news";
import ImageLibrary from "../components/library_image/album";
import Card from "../../../components/card/Card";

const Letter: React.FC = () => {
  return (
    <div className={styles.visionContainer}>
      <div className={styles.title}>
        <h3>THƯ NGỎ</h3>
      </div>
    </div>
  );
};

export default Letter;