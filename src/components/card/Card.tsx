import React from "react";
import styles from "./Card.module.scss";
import { Button, Skeleton } from "antd";
import dayjs from "dayjs";

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
      {loading ? (
        Array.from({ length:8 }).map((_, index) => (
          <div key={index} className={styles.cardItem}>
            <Skeleton.Image active className={styles.cardImageSkeleton} />
            <div className={styles.cardContent}>
              <Skeleton active title={{ width: '80%' }} paragraph={{ rows: 2 }} />
            </div>
          </div>
        ))
      ) : (
        cardData.map((card, index) => (
          <div key={index} className={styles.cardItem}>
            <div className={styles.cardImage}>
              <img src={card.thumbnail} alt={`Card ${index + 1}`} />
            </div>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{card.title}</h2>
              <small className={styles.cardMeta}>
                by
                <a href={`/author/${card.authorId._id}`} className={styles.Link}>
                  {" "}
                  {card.authorId.username}
                </a>{" "}
                - <span>{dayjs(card.createdAt).format('MMMM D, YYYY')}</span>
              </small>
              <p className={styles.cardSubtitle}>{card.description}</p>
              <a href={`/post/${card.slug}`} className={styles.Link}>
                <Button type="primary">Read Post</Button>
              </a>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Card;
