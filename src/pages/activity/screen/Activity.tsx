import React, { useState, useEffect, ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Activity.module.scss";
import { getListBlogs } from "../../auth/api/auth.api";
import Card from "../../../components/card/Card";
import { BlogPostData } from "../types/blogdata.type";
import Banner from "../../../components/banner/Banner";
import { getPostsByCategories } from "../api/activity.api";
import CardItemsCategory from "../../../components/cardItems/CardItemsCategory";

const Activity = () => {
  const [cardData, setCardData] = useState<BlogPostData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const page = 1;
  const [limit, setLimit] = useState<number>(10);
  const location = useLocation();

  const categories = [
    { name: "VĂN HÓA GIÁO DỤC", path: "/Activity" },
    { name: "CHĂM SÓC SỨC KHỎE CỘNG ĐỒNG", path: "/suc-khoe-cong-dong" },
    { name: "HỖ TRỢ SINH KẾ", path: "/ho-tro-sinh-ke" },
    { name: "AN SINH XÃ HỘI", path: "/an-sinh-xa-hoi" },
  ];

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
  const otherNews = cardData.slice(3);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <Banner />
      <div className={styles.content}>
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
        <div className={styles.mainContent}>
          <div className={styles.title}>
            <h3>VĂN HÓA - GIÁO DỤC</h3>
            {/* <div className={styles.line}></div> */}
            {/* <h4>TIN NỔI BẬT</h4> */}
            <div className={styles.fieldContainer}>
              <div className={styles.fieldText}>
                <h2>
                  PHÁT TRIỂN THẾ HỆ TƯƠNG LAI LÀ PHÁT TRIỂN TIỀM LỰC CỐT LÕI CỦA
                  XÃ HỘI
                </h2>
                <p>
                  Với mục tiêu đem tới cơ hội học tập công bằng, cơ hội phát
                  triển xứng đáng cho những tài năng, Quỹ Thiện Tâm hy vọng đem
                  tới nguồn động viên cả về vật chất và tinh thần: Những chương
                  trình xây dựng trường học, nhà bán trú, trao học bổng hằng
                  năm, xây dựng văn hóa đọc; đồng thời tạo chỗ dựa đem tới những
                  cơ hội giáo dục bền vững và lâu dài.{" "}
                </p>
              </div>
              <img
                src="http://quythientam.com/mediacenter//media/images/2427/category/cover/nh-net-1621237619.jpg"
                alt="Field Image"
                className={styles.fieldImage}
              />
            </div>
          </div>
          <div className={styles.cardContainer}>
            <CardItemsCategory cardData={highlightedNews} loading={isLoading} />
          </div>
          {/* <h4>TIN TỨC KHÁC</h4>
          <div className={styles.cardContainer}>
            <Card cardData={otherNews} loading={isLoading} />
            <div className={styles.BtnLoadMore}>
              {cardData.length > 0 && (
                <button
                  className={styles.loadMoreButton}
                  onClick={handleLoadMore}
                >
                  Load More
                </button>
              )}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Activity;
