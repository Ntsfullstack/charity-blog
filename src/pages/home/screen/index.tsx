import React, { useState, useEffect } from "react";
import styles from "./Home.module.scss"; // Make sure you have this file
import { getListBlogs } from "../../auth/api/auth.api";
import Card from "../../../components/card/Card";
import { BlogPostData } from "../types/blogdata.type";

const Homepage = () => {
  const [cardData, setData] = useState<BlogPostData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await getListBlogs();
        if (response?.status === 200) {
          setData(response?.data);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        if (error instanceof Error) {
          // Check if it's an Error object
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false); // Data fetching is complete, set isLoading to false
      }
    };

    fetchBlogData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.cardContainer}>
      <Card cardData={cardData} loading={isLoading} />
    </div>
  );
};

export default Homepage;
