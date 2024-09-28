import React from "react";
import styles from "./Vision.module.scss";

const Vision: React.FC = () => {
  return (
    <div className={styles.visionContainer}>
      <div className={styles.title}>
        <h3>TẦM NHÌN - SỨ MỆNH</h3>
      </div>
      <div className={styles.content}>
        <section className={styles.vision}>
          <h4>Tầm nhìn:</h4>
          <p>Quỹ Từ thiện Bảo Phong phấn đấu trở thành quỹ từ thiện hàng đầu Việt Nam, mang tình yêu thương đến mọi miền Tổ quốc và vươn ra thế giới.</p>
        </section>
        <section className={styles.mission}>
          <h4>Sứ mệnh:</h4>
          <p>Quỹ Từ thiện Bảo Phong cam kết đóng góp cho cộng đồng, giải quyết các vấn đề xã hội bằng chính tính yêu thương và trách nhiệm cao của mình với cuộc sống con người, xã hội.</p>
        </section>
        <section className={styles.coreValues}>
          <h4>Giá trị cốt lõi:</h4>
          <ul>
            <li>Nhân văn</li>
            <li>Trách nhiệm</li>
            <li>Đổi mới</li>
            <li>Gắn kết</li>
            <li>Phát triển</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Vision;