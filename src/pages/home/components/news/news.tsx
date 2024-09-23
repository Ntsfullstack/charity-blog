import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import dayjs from "dayjs";
import styles from "./news.module.scss";
import { useTranslation } from 'react-i18next';
import { getCategoryPosts } from "../../../main_page/api/mainPage.api";
import { BlogData } from "../../../auth/types/types";

interface RelatedArticlesProps {
  currentArticleId: string;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  currentArticleId,
}) => {
  const { t } = useTranslation();
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
    return <p className={styles.loadingMessage}>{t('loading')}</p>;
  }

  if (error) {
    return <p className={styles.errorMessage}>{t('error_loading_articles')}: {error}</p>;
  }

  return (
    <div className={styles.relatedArticlesContainer}>
      <h1>{t('news-event')}</h1>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView="auto"
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          }
        }}
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
                {t('by')}&nbsp;
                <a
                  href={`/author/${article.authorId._id}`}
                  className={styles.link}
                >
                  {article.authorId.username}
                </a>
                &nbsp;- <span>{dayjs(article.createdAt).format("MMMM D, YYYY")}</span>
              </small>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RelatedArticles;