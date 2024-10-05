import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./HomeLayout.module.scss";
import SideChildPage from "../components/SiderChildPage/SideChildPage";
import Banner from "../components/banner/Banner";
import { getCategories } from "../pages/activity/api/activity.api";
import { Category } from "../pages/auth/types/types";

const PageChildLayout2 = () => {
  const [someCategories, setSomeCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setSomeCategories(response.data.slice(2, 5));
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Banner />
      <div className={styles.mainContent}>
        <SideChildPage categories={someCategories}>
          <Outlet />
        </SideChildPage>
      </div>
    </>
  );
};

export default PageChildLayout2;
