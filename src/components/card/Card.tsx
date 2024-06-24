import React from "react";
import { Skeleton } from "antd";
import styles from "./Card.module.scss";
import CardItem from "./cardItem";

interface BlogPostData {
  title: string;
  thumbnail: string;
  description: string;
  authorId: {
    _id: string;
    username: string;
  };
  createdAt: string;
  slug: string;
}

interface CardProps {
  cardData: BlogPostData[];
  loading: boolean;
}

const Card: React.FC<CardProps> = ({ cardData, loading }) => {
  return (
    <>
      {loading
        ? Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className={styles.cardItem}>
              <Skeleton.Image active className={styles.cardImageSkeleton} />
              <div className={styles.cardContent}>
                <Skeleton
                  active
                  title={{ width: "80%" }}
                  paragraph={{ rows: 2 }}
                />
              </div>
            </div>
          ))
        : cardData.map((card, index) => <CardItem key={index} {...card} />)}
    </>
  );
};

export default Card;
