import React from "react";
import { Skeleton } from "antd";
import styles from "./Card.module.scss";
import CardItem from "./cardItem";

const CardItemsCategory = ({ cardData, loading }) => {
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
        : cardData.map((card, index) => (
            <CardItem key={index} {...card.postId} />
          ))}
    </>
  );
};

export default CardItemsCategory;
