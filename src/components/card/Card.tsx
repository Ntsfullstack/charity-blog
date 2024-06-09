import React from "react";
import styles from "./Card.module.scss"; // Use 'styles' for consistency
import { Button } from "antd";
import { BlogPostData } from "../../pages/home/types/blogdata.type";
import dayjs from "dayjs";
const Card = (props: any) => {
  return (
    <>
      {props.cardData.map((card: any, index: any) => (
        <div key={index} className={styles.cardItem}>
          <div className={styles.cardImage}>
            <img src={card.thumbnail} alt={`Card ${index + 1}`} />
          </div>
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>{card.title}</h2>
            <small className={styles.cardMeta}>
              by
              <a href={card.authorId._id} className={styles.Link}>
                {" "}
                {card.authorId.username}
              </a>{" "}
              - <span>{dayjs(card.createdAt).format("DD/MM/YYYY")}</span>
            </small>
            <p className={styles.cardSubtitle}>{card.description}</p>
            <p></p>
            <a href={`/post/${card.slug}`} className={styles.Link}>
              <Button type="primary">Read Post</Button>
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
