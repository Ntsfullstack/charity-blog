import React from "react";
import styles from "./field.module.scss";

const Field: React.FC = () => {
  return (
    <div className={styles.fieldContent}> 
    <h1>CÁC HOẠT ĐỘNG CHÍNH</h1>
        <div className={styles.fieldContainer}>
      <img
        src="http://quythientam.com/mediacenter//media/images/905/menu/icons/anh1-1558063714.png"
        alt="Field Image"
        className={styles.fieldImage}
      />
      <div className={styles.fieldText}>
        <h2>HOẠT ĐỘNG THIỆN NGUYỆN</h2>
        <h3>GIẢI QUYẾT CÁC VẤN ĐỀ XÃ HỘI.</h3>
      <p>Hoạt động thiện nguyện là một hình thức tình nguyện cao cả, tập trung vào sự quan tâm, giúp đỡ và chia sẻ với những người gặp khó khăn trong cuộc sống. Điều đặc biệt là hoạt động thiện nguyện không chỉ mạng lại lợi ích cho người </p>
      </div>
    </div>
    <div className={styles.fieldContainer2}>
    <div className={styles.fieldText2}>
        <h2>AN SINH XÃ HỘI</h2>
        <h3>GIẢI QUYẾT CÁC VẤN ĐỀ XÃ HỘI</h3>
        <p>Hoạt động thiện nguyện là một hình thức tình nguyện cao cả, tập trung vào sự quan tâm, giúp đỡ và chia sẻ với những người gặp khó khăn trong cuộc sống. Điều đặc biệt là hoạt động thiện nguyện không chỉ mạng lại lợi ích cho người </p>
      </div>
      <img
        src="http://quythientam.com/mediacenter//media/images/905/menu/icons/anh2-1558063725.png"
        alt="Field Image"
        className={styles.fieldImage2}
      />

    </div>
    </div>

  );
};

export default Field;
