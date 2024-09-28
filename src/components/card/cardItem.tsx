import React, { useState } from "react";
import { Button, Spin } from "antd"; // Thêm import Spin
import dayjs from "dayjs";
import styles from "./CardItems.module.scss";
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
  const [loading, setLoading] = useState(true); // State để theo dõi trạng thái loading của hình ảnh

  return (
    <div className={styles.cardItem}>
      <div className={styles.cardImage}>
        {loading && (
          <div className={styles.imageLoading}>
            <Spin size="small" /> {/* Hiển thị loading spinner */}
          </div>
        )}
        <img
          src={props.thumbnail}
          alt={props.title}
          className={styles.image}
          onLoad={() => setLoading(false)} // Đặt loading thành false khi hình ảnh đã tải xong
          style={{ display: loading ? "none" : "block" }} // Ẩn hình ảnh khi đang loading
        />
      </div>
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{props.title}</h2>
        <small className={styles.cardMeta}>
          by
          <a href={`/author/${props.authorId._id}`} className={styles.link}>
            {" "}
            {props.authorId.username || "Admin"}
          </a>{" "}
          - <span>{dayjs(props.createdAt).format("MMMM D, YYYY")}</span>
        </small>
        <p className={styles.cardSubtitle}>{props.description}</p>
        <a
          href={`/post/${props.slug}`}
          className={clsx(styles.link, styles.button)}
        >
          <Button type="primary" className={styles.readMoreButton}>
            Đọc tiếp
          </Button>
        </a>
      </div>
    </div>
  );
};

export default CardItem;
