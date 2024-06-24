import React from "react";
import styles from "./news.module.scss";

const News: React.FC = () => {
  return (
    <div className={styles.fieldContainer}>
        <h1>TIN TỨC - SỰ KIỆN</h1>
        <p>Hãy cập nhật những dự án và chương trình mới nhất của chúng tôi. Và đồng hành lan tỏa những điều thiện!</p>
    </div>
  );
};

export default News;
