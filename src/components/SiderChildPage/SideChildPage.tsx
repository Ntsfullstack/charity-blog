// SideChildPage.tsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./SideChildPage.module.scss";
import { getPostsByCategories } from "../../pages/activity/api/activity.api";
import Card from "../card/Card";
import { BlogPostData } from "../types/blogdata.type";

interface Category {
  name: string;
  path: string;
  id: string;
}

interface SiderChildPageProps {
  categories: Category[];
}

const SiderChildPage: React.FC<SiderChildPageProps> = ({ categories }) => {
  const location = useLocation();
  const [cardData, setCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Find the active category based on the current path
  const activeCategory = categories.find(category => category.path === location.pathname);

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (activeCategory) {
        try {
          setIsLoading(true);
          const response = await getPostsByCategories(activeCategory.id);
          if (response?.status === 200) {
            setCardData(response.data);
          }
        } catch (error) {
          console.error("Error fetching category data:", error);
          setError("An error occurred while fetching data.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCategoryData();
  }, [activeCategory]);

  const highlightedNews = cardData.slice(0, 3);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.siderChildPage}>
      <ul className={styles.categoryList}>
        {categories.map((category) => (
          <li key={category.path} className={category.path === location.pathname ? styles.active : ''}>
            <Link to={category.path}>{category.name}</Link>
          </li>
        ))}
      </ul>
      <div className={styles.categoryContent}>
        <h3>{activeCategory ? activeCategory.name : 'Select a category'}</h3>
        <div className={styles.cardContainer}>
          <Card cardData={highlightedNews} loading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default SiderChildPage;

