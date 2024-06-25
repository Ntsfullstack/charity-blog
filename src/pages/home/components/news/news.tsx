import React, { useEffect, useState, useCallback } from 'react';
import styles from './news.module.scss';
import { getRelatedArticles } from "../../../../relatedArticles/RelatedArticles.api";

interface NewsItem {
  id: number;
  image: string;
  title: string;
  description: string;
  slug: string;
}

interface NewsProps {
  slug?: string;
}

const News: React.FC<NewsProps> = ({ slug = 'default-slug' }) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getRelatedArticles(slug);
      if (Array.isArray(data)) {
        setNewsItems(data);
      } else {
        throw new Error('Data is not in the expected format');
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Không thể tải tin tức. Vui lòng thử lại sau.');
      setNewsItems([]);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (loading) return <div className={styles.loading}>Đang tải...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.fieldContainer}>
      <h1 className={styles.title}>TIN TỨC - SỰ KIỆN</h1>
      <p className={styles.description}>Hãy cập nhật những dự án và chương trình mới nhất của chúng tôi. Và đồng hành lan tỏa những điều thiện!</p>
      {newsItems.length > 0 ? (
        <div className={styles.newsGrid}>
          {newsItems.map((item) => (
            <div key={item.id} className={styles.newsItem}>
              <img src={item.image} alt={item.title} className={styles.image} />
              <div className={styles.textContent}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemDescription}>{item.description}</p>
                <button className={styles.btn}>Đọc thêm</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noNews}>Không có tin tức nào để hiển thị.</div>
      )}
    </div>
  );
};

export default News;