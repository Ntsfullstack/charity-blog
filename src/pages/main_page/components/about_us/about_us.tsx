import React from 'react';
import styles from './AboutUs.module.scss';

const AboutUs: React.FC = () => {
  return (
    <div className={styles.container}>
      <p>Kính gửi: Quý khách hàng – Đối tác!</p>
      <p>
        Lời đầu tiên, Công ty Đấu giá Hợp danh Bảo Phong xin gửi đến Quý khách hàng lời chào trân trọng, lời chúc sức khỏe, thành công và lời cảm ơn tới những Quý khách hàng đã, đang và sẽ hợp tác với Công ty chúng tôi.
      </p>
      <p>
        Công ty Đấu giá Hợp danh Bảo Phong là Công ty đấu giá chuyên nghiệp, có bề dầy kinh nghiệm trong lĩnh vực đấu giá tài sản, được chuyển đổi từ Công ty Đấu giá Hợp danh Thái Linh, thành lập ngày 08/03/2012.
      </p>
      <p>
        Phương châm hoạt động của Công ty Đấu giá Hợp danh Bảo Phong:
        <ul>
          <li>Tuân thủ pháp luật</li>
          <li>Đặt quyền lợi của khách hàng lên trên quyền lợi của Công ty</li>
          <li>Chi phí dịch vụ đấu giá hợp lý</li>
        </ul>
      </p>
      <p>
        Giá trị cốt lõi của Công ty Đấu giá Hợp danh Bảo Phong là:
        <ul>
          <li>Coi trọng chữ TÍN</li>
          <li>Mong muốn hợp tác lâu dài và luôn đồng hành cùng Quý khách hàng.</li>
        </ul>
      </p>
      <p>
        Với đội ngũ nhân viên được đào tạo chuyên nghiệp về chuyên môn, nghiệp vụ cũng như tinh thần trách nhiệm cao trong công việc, Công ty Đấu giá Hợp danh Bảo Phong luôn nỗ lực để trở thành đối tác tin cậy, người bạn đồng hành thân thiết của Quý khách hàng.
      </p>
      <p>Xin trân trọng cảm ơn!</p>
    </div>
  );
}

export default AboutUs;
