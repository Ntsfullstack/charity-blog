import React from "react";
import styles from "./field.module.scss";

const Field: React.FC = () => {
  return (
    <div className={styles.fieldContent}> 
    <h1>LĨNH VỰC HOẠT ĐỘNG</h1>
        <div className={styles.fieldContainer}>
      <img
        src="http://quythientam.com/mediacenter//media/images/905/menu/icons/anh1-1558063714.png"
        alt="Field Image"
        className={styles.fieldImage}
      />
      <div className={styles.fieldText}>
        <h2>VĂN HÓA - GIÁO DỤC</h2>
        <h3>PHÁT TRIỂN NGUỒN LỰC CỐT LÕI CỦA XÃ HỘI...</h3>
      <p>Với mục tiêu đem tới cơ hội học tập công bằng, cơ hội phát triển xứng đáng cho những tài năng, Quỹ Thiện Tâm hy vọng đem tới nguồn động viên cả về vật chất và tinh thần: Những chương trình xây dựng trường học, nhà bán trú, trao học bổng hằng năm, xây dựng văn hóa đọc; đồng thời tạo chỗ dựa đem tới những cơ hội giáo dục bền vững và lâu dài. </p>
      </div>
    </div>
    <div className={styles.fieldContainer2}>
    <div className={styles.fieldText2}>
        <h2>CHĂM SÓC SỨC KHỎE CỘNG ĐỒNG</h2>
        <h3>TRAO CƠ HỘI ĐƯỢC CHĂM SÓC SỨC KHỎE CHO TẤT CẢ MỌI NGƯỜI</h3>
      <p>Tổ chức nhiều chương trình khám chữa bệnh, phẫu thuật miễn phí, tài trợ thuốc chữa bệnh, xây dựng và đầu tư trang thiết bị y tế; phối hợp với các bệnh viện và chuyên gia uy tín hàng đầu tạo cơ hội cho hàng trăm nghìn người tiếp cận các dịch vụ y tế chăm sóc tốt nhất.</p>
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
