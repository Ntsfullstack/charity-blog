import React from "react";
import styles from "./field.module.scss";

const Field: React.FC = () => {
  return (
    <div className={styles.fieldContainer}>
      <img
        src="https://via.placeholder.com/150"
        alt="Field Image"
        className={styles.fieldImage}
      />
      <div className={styles.fieldText}>
        Lĩnh vực hoạt động của chúng tôi là đấu giá tài sản, đảm bảo tính minh
        bạch và công bằng cho tất cả các bên tham gia.
      </div>
    </div>
  );
};

export default Field;
