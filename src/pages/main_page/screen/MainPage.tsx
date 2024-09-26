import React, { useState, useEffect } from "react";
import styles from "./MainPage.module.scss";
import Card from "../../../components/card/Card";
import { getCategoryPosts } from "../api/mainPage.api";
import { BlogData } from "../../auth/types/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MainPage = () => {
  const [cardData, setCardData] = useState<BlogData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await getCategoryPosts("667c308ca7e983158ba550be", false, 1, 4);
        if (response.status === 200) {
          setCardData(response?.data);
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
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else if (direction === 'right' && currentIndex < cardData.length - 3) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.mainPage}>
      <div className={styles.title}>
        {/* <h3>TIN TỨC - SỰ KIỆN</h3> */}
        {/* <div className={styles.cardContainer}>
          <Card cardData={cardData} loading={isLoading} />
        </div> */}
        {/* <p>Hãy cập nhật những dự án mới nhất của chúng tôi</p>
        <h4>TIN NỔI BẬT</h4> */}
        {/* <div className={styles.cardContainer}>
          <Card cardData={cardData} loading={isLoading} />
        </div> */}
      </div>
      {/* <h4>TIN TỨC KHÁC</h4> */}
      <div className={styles.sliderContainer}>
        {/* <button
          onClick={() => scroll('left')}
          className={styles.sliderButton}
          disabled={currentIndex === 0}
        >
          <ChevronLeft />
        </button> */}
        {/* <div className={styles.sliderWrapper}>
          <div
            className={styles.slider}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            {cardData.map((news, index) => (
              <div key={index} className={styles.sliderItem}>
                <Card cardData={[news]} loading={isLoading} />
              </div>
            ))}
          </div>
        </div> */}
        {/* <button
          onClick={() => scroll('right')}
          className={styles.sliderButton}
          disabled={currentIndex >= cardData.length - 1}
        >
          <ChevronRight />
        </button> */}
      </div>
    </div>
  );
};

export default MainPage;