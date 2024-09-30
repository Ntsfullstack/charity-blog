import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./HomeLayout.module.scss";
import SideChildPage from "../components/SiderChildPage/SideChildPage";
import Banner from "../components/banner/Banner";
import { getCategories } from "../pages/activity/api/activity.api";
import { Category } from "../pages/auth/types/types";
import Activity from "../pages/activity/screen/Activity";

const PageChildLayout = () => {
  const [someCategories, setSomeCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setSomeCategories(response.data);
      console.log(response.data);
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

export default PageChildLayout;
