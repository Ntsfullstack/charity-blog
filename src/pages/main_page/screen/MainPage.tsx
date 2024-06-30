import React, { useState, useEffect } from "react";
import styles from "./MainPage.module.scss";
import Card from "../../../components/card/Card";
import { getListBlogMore } from "../api/mainPage.api";
import { BlogData } from "../../auth/types/types";

const MainPage = () => {
  const [cardData, setCardData] = useState<BlogData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState<number>(10);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await getListBlogMore(limit);
        if (response) {
          setCardData(response?.data.content);
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
    <>
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
    </>
  );
};

export default MainPage;
