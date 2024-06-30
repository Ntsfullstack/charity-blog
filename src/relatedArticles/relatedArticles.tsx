import React, { useEffect, useState } from "react";
import CardItem from "../components/card/cardItem";
import { getRelatedArticles } from "./RelatedArticles.api";
import styles from "./relatedArticles.module.scss";

interface RelatedArticlesProps {
  relatedArticles: any;
}
const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  relatedArticles,
}) => {
  console.log(relatedArticles);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (error) {
    return <p>Error loading articles: {error}</p>;
  }

  return (
    <div className={styles.relatedArticlesContainer}>
      <h2>Related Articles</h2>
      <div className={styles.articlesList}>
        {relatedArticles &&
          relatedArticles.map((article: any, index: number) => (
            <CardItem key={index} {...article} />
          ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
