import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./SideChildPage.module.scss";

import { Category } from "../../pages/auth/types/types";

interface SiderChildPageProps {
  categories: Category[];
  children: React.ReactNode;
}

const SiderChildPage: React.FC<SiderChildPageProps> = ({
  categories,
  children,
}) => {
  console.log(categories);
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const currentCategory = categories.find(
      (cat: Category) => cat.path === location.pathname
    );
    setSelectedCategory(currentCategory ? currentCategory.path : null);
  }, [location, categories]);

  return (
    <div className={styles.siderChildPage}>
      <ul className={styles.categoryList}>
        {categories.map((category: Category) => (
          <Link to={category.path} key={category.path}>
            <li
              className={
                category.path === selectedCategory ? styles.active : ""
              }
            >
              {category.title}
            </li>
          </Link>
        ))}
      </ul>
      <div className={styles.categoryContent}>{children}</div>
    </div>
  );
};

export default SiderChildPage;
