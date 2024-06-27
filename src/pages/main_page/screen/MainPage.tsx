import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./MainPage.module.scss";
import { getListBlogs } from "../../auth/api/auth.api";
import Card from "../../../components/card/Card";
import { BlogPostData } from "../types/blogdata.type";
import Banner from "../../../components/banner/Banner";
import { getPostsByCategories } from "../../activity/api/activity.api";
import CardItemsCategory from "../../../components/cardItems/CardItemsCategory";
const MainPage = () => {
  const [cardData, setCardData] = useState<BlogPostData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const page = 1;
  const [limit, setLimit] = useState<number>(10);
  const location = useLocation();

  const categories = [
    { name: "TIN TỨC-SỰ KIỆN", path: "/MainPage" },
    { name: "TUYỂN DỤNG", path: "/tuyen-dung" },
    { name: "THÔNG CÁO BÁO CHÍ", path: "/thong-cao-bao-chi" }
  ];

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await getListBlogs(page, limit);
        if (response?.status === 200) {
          setCardData(response.data);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, [limit]);

  const handleLoadMore = () => {
    if (limit > cardData.length) {
      return;
    }
    setLimit((prevLimit) => prevLimit + 5);
  };

  const highlightedNews = cardData.slice(0, 3);
  const otherNews = cardData.slice(3);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <Banner />
      <div className={styles.content}>
        <div className={styles.categoriesSidebar}>
          <ul>
            {categories.map((category) => (
              <li key={category.name}>
                <div className={`${styles.categoryBox} ${location.pathname === category.path ? styles.active : ''}`}>
                  <a href={category.path}>{category.name}</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.mainContent}>
          <div className={styles.title}>
            <h3>TIN TỨC - SỰ KIỆN</h3>
            <div className={styles.line}></div>
            <p>Hãy cập nhật những dự án mới nhất của chúng tôi</p>
            <h4>TIN NỔI BẬT</h4>
            <div className={styles.cardContainer}>
              <Card cardData={highlightedNews} loading={isLoading} />
            </div>
          </div>
          <h4>TIN TỨC KHÁC</h4>
          <div className={styles.cardContainer}>
            <Card cardData={otherNews} loading={isLoading} />
            <div className={styles.BtnLoadMore}>
              {cardData.length > 0 && (
                <button className={styles.loadMoreButton} onClick={handleLoadMore}>
                  Load More
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
