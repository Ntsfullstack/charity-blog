import React from "react";
import { Button } from "antd";
import dayjs from "dayjs";
import styles from "./Card.module.scss";
import clsx from "clsx";

interface CardItemProps {
  thumbnail: string;
  title: string;
  description: string;
  authorId: {
    _id: string;
    username: string;
  };
  createdAt: string;
  slug: string;
}

const CardItem: React.FC<CardItemProps> = (props) => {
  return (
    <div className={styles.cardItem}>
      <div className={styles.cardImage}>
        <img src={props.thumbnail} alt={props.title} />
      </div>
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{props.title}</h2>
        <small className={styles.cardMeta}>
          by
          <a href={`/author/${props.authorId._id}`} className={styles.link}>
            {" "}
            {props.authorId.username}
          </a>{" "}
          - <span>{dayjs(props.createdAt).format("MMMM D, YYYY")}</span>
        </small>
        <p className={styles.cardSubtitle}>{props.description}</p>
        <a
          href={`/post/${props.slug}`}
          className={clsx(styles.link, styles.button)}
        >
          <Button type="primary">Read Post</Button>
        </a>
      </div>
    </div>
  );
};

export default CardItem;
