import React, { useState, useEffect } from "react";
import styles from "./Home.module.scss"; // Make sure you have this file
import { getListBlogs } from "../../auth/api/auth.api";
import Card from "../../../components/card/Card";
import { BlogPostData } from "../types/blogdata.type";
import Banner from "../../../components/banner/Banner";

const Homepage = () => {
  const [cardData, setCardData] = useState<BlogPostData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const limit = 15;

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await getListBlogs(page, limit);
        if (response?.status === 200) {
          // Append new data to the existing cardData
          setCardData((prevData) => [...prevData, ...response.data]);
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
  }, [page]); // Include page in the dependency array to fetch data when page changes

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number to load more data
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.cardContainer}>
      <Banner />
      <Card cardData={cardData} loading={isLoading} />
      <div className={styles.BtnLoadMore}>
        {cardData.length > 0 && (
          <button className={styles.loadMoreButton} onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Homepage;
