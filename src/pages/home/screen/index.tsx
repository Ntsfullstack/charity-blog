import React, { useState, useEffect } from "react";
import styles from  "./Home.module.scss"; // Make sure you have this file
import image1 from "./image1.jpg"; // Placeholder image until data is fetched
import { getListBlogs } from "../../auth/api/auth.api";
import Card from "../../../components/card/Card";

import {BlogPostData} from "../types/blogdata.type"

interface BlogPost {
  data: BlogPostData[];
  status: string;
}

const Homepage = () => {
  const [cardData, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await getListBlogs();
        if (response?.status === "success" as any) {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.cardContainer}>
      <Card cardData={cardData} />
    </div>
  );
};

export default Homepage;
