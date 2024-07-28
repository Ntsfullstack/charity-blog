import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper";
import dayjs from "dayjs";
import styles from "./news.module.scss";
import { t } from 'i18next';
import { getCategoryPosts } from "../../../main_page/api/mainPage.api";
import { BlogData, BlogResponse } from "../../../auth/types/types";

interface RelatedArticlesProps {
  currentArticleId: string;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  currentArticleId,
}) => {
  const [articles, setArticles] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      setLoading(true);
      try {
        const response = await getCategoryPosts("667c308ca7e983158ba550be");
        if (response) {
          setArticles(response.data);
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedArticles();
  }, [currentArticleId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading articles: {error}</p>;
  }

  return (
    <div className={styles.relatedArticlesContainer}>
      <h1>{t('news-event')}</h1>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        className={styles.carousel}
      >
        {articles.map((article, index) => (
          <SwiperSlide key={index} className={styles.cardItem}>
            <div className={styles.cardImage}>
              <img src={article.thumbnail} alt={article.title} />
            </div>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{article.title}</h2>
              <small className={styles.cardMeta}>
                by
                <a
                  href={`/author/${article.authorId._id}`}
                  className={styles.link}
                >
                  {article.authorId.username}
                </a>
                - <span>{dayjs(article.createdAt).format("MMMM D, YYYY")}</span>
              </small>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RelatedArticles;
