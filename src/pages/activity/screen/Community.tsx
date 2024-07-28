import React, { useState, useEffect, ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Activity.module.scss";
import { getListBlogs } from "../../auth/api/auth.api";
import Card from "../../../components/card/Card";
import { BlogPostData } from "../types/blogdata.type";
// import Banner from "../../../components/banner/Banner";
import { getPostsByCategories } from "../api/activity.api";
import CardItemsCategory from "../../../components/cardItems/CardItemsCategory";

const Activity = () => {
  const [cardData, setCardData] = useState<BlogPostData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState<number>(10);
  const location = useLocation();
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await getPostsByCategories("667bcecfec596a8638ebd2a9");
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.content}>
        <div className={styles.mainContent}>
          <div className={styles.title}>
          </div>
          <div className={styles.cardContainer}>
            <Card cardData={highlightedNews} loading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
