import React, { useState, useEffect } from "react";
import AboutUs from "../components/about_us/about_us";
import Field from "../components/field/field";
import styles from "./Home.module.scss";
import banner from "../../../assets/images/banner.jpg";
import RelatedArticles from "../components/news/news";
import ImageLibrary from "../components/library_image/album";
import { getCategory } from "../../main_page/api/mainPage.api";

const MainPage: React.FC = () => {
  const [firstCategoryId, setFirstCategoryId] = useState<string>("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categories = await getCategory();
        if (categories.status === 200) {
          console.log(categories.data[0]._id);
          setFirstCategoryId(categories.data[0]._id);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };

    fetchCategory();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <header className={styles.banner}>
        <img src={banner} alt="Banner" />
      </header>
      <main className={styles.content}>
        <RelatedArticles currentArticleId={firstCategoryId} outstanding />
        <Field />
        <AboutUs />
        <ImageLibrary />
      </main>
    </div>
  );
};

export default MainPage;
