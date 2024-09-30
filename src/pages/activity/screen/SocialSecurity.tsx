import React, { useState, useEffect } from "react";
import styles from "./Activity.module.scss";
import Card from "../../../components/card/Card";
import {
  getCategory,
  getCategoryPosts,
} from "../../main_page/api/mainPage.api";
import { BlogData } from "../../auth/types/types";

const SocialSecurity = () => {
  const [cardData, setCardData] = useState<BlogData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [featurePosts, setFeaturePosts] = useState<BlogData[]>([]);

  const fetchPosts = async (featured: boolean) => {
    try {
      setIsLoading(true);
      const categories = await getCategory();
      if (categories?.status === 200 && categories?.data?.length > 0) {
        const categoryId = categories.data[0]?._id;
        if (categoryId) {
          const response = await getCategoryPosts(categoryId, featured, 1, 4);
          if (response?.status === 200) {
            return response.data || [];
          } else {
            throw new Error("Không thể lấy bài viết cho danh mục");
          }
        } else {
          throw new Error("Không tìm thấy ID danh mục");
        }
      } else {
        throw new Error("Không có danh mục nào được tìm thấy");
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setError(
        error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định."
      );
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllPosts = async () => {
      const regularPosts = await fetchPosts(false);
      const featuredPosts = await fetchPosts(true);
      setCardData(regularPosts);
      setFeaturePosts(featuredPosts);
    };

    fetchAllPosts();
  }, []);

  if (isLoading) {
    return <div className={styles.loading}>Đang tải...</div>;
  }

  if (error) {
    return <div className={styles.error}>Lỗi: {error}</div>;
  }

  return (
    <div className={styles.mainPage}>
      <div className={styles.title}>
        <h3>TIN TỨC - SỰ KIỆN</h3>
        <div className={styles.cardContainer}>
          <Card cardData={cardData} loading={isLoading} />
        </div>
        <p>Hãy cập nhật những dự án mới nhất của chúng tôi</p>
        <h4>TIN NỔI BẬT</h4>
        <div className={styles.cardContainer}>
          <Card cardData={featurePosts} loading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default SocialSecurity;
