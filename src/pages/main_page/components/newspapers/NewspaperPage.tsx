import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Newspaper.module.scss";
import { getPostsByCategories } from "../../../activity/api/activity.api";
import Card from "../../../../components/card/Card";
import { BlogPostData } from "../../types/blogdata.type";
import Banner from "../../../../components/banner/Banner";

const NewspaperPage = () => {
  const [cardData, setCardData] = useState<BlogPostData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const page = 1;
  const [limit, setLimit] = useState<number>(10);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await getPostsByCategories("667d84a8dad624ab4905d016");
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
      <div className={styles.content}>
        <div className={styles.mainContent}>
          <div className={styles.title}>
            <h3>THÔNG CÁO BÁO CHÍ</h3>
            <div className={styles.cardContainer}>
              <Card cardData={highlightedNews} loading={isLoading} />
            </div>
            <div className={styles.fieldContainer}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewspaperPage;
