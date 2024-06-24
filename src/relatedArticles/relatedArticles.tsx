import React, { useEffect, useState } from "react";
import CardItem from "../components/card/cardItem";
import { getRelatedArticles } from "./RelatedArticles.api";
import styles from "./relatedArticles.module.scss";

interface RelatedArticlesProps {
  currentArticleId: string;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  currentArticleId,
}) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      setLoading(true);
      try {
        const response = await getRelatedArticles(currentArticleId);
        if (response) {
          setArticles(response);
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
      <h2>Related Articles</h2>
      <div className={styles.articlesList}>
        {articles &&
          articles.map((article, index) => (
            <CardItem key={index} {...article} />
          ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
