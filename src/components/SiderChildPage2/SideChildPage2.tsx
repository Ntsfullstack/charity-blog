import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../SiderChildPage2/SideChildPage2.module.scss";
import { getCategoryPosts } from "../../pages/main_page/api/mainPage.api";
import Card from "../card/Card";
import { BlogPostData } from "../../pages/activity/types/blogdata.type";

interface Category {
  name: string;
  path: string;
  id: string;
}

interface SiderChildPageProps {
  categories: Category[];
}

const SiderChildPage2: React.FC<SiderChildPageProps> = ({ categories }) => {
  const location = useLocation();
  const [cardData, setCardData] = useState<BlogPostData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeCategory = categories.find(category => category.path === location.pathname);

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (activeCategory) {
        try {
          setIsLoading(true);
          const response = await getCategoryPosts(activeCategory.id);
          if (response?.status === 200) {
            const formattedData = response.data.map((post: any) => ({
              ...post,
              id: post._id,
            }));
            setCardData(formattedData);
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

  const highlightedNews = cardData.slice(0, 2);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const showExtraContent = activeCategory?.id === "667c30c1a7e983158ba550bf";

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
        {showExtraContent && <p>Hãy cập nhật những tin tức mới nhất của chúng tôi</p>}
        <div className={styles.cardContainer}>
          <Card cardData={highlightedNews} loading={isLoading} />
        </div>
        {showExtraContent && <h3>TIN TỨC KHÁC</h3>}
        <div></div>
      </div>
    </div>
  );
};

export default SiderChildPage2;