import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./SideChildPage.module.scss";

// Define the types for the props
interface Category {
  name: string;
  path: string;
}

interface SiderChildPageProps {
  categories: Category[];
}

const SiderChildPage: React.FC<SiderChildPageProps> = ({ categories }) => {
  const location = useLocation();

  return (
    <div className={styles.categoriesSidebar}>
      <ul>
        {categories.map((category) => (
          <li key={category.name}>
            <div
              className={`${styles.categoryBox} ${
                location.pathname === category.path ? styles.active : ""
              }`}
            >
              <Link to={category.path}>{category.name}</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SiderChildPage;
