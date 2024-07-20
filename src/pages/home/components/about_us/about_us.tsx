import React from 'react';
import styles from './AboutUs.module.scss';

const AboutUs: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>VỀ CHÚNG TÔI</h1>
        <p>Giảm bớt bất bình đằng trong xã hội</p>
        <p>
          Hoạt động thiện nguyện giúp giảm bớt bất bình đẳng trong xã hội và xây dựng một cộng đồng công bằng và văn minh. Bằng cách giúp đỡ những người gặp khó khăn, chúng ta có thể tạo ra sự cân bằng và giảm bớt khoảng cách xã hội.
        </p>
        <p>Tăng cường sự đoàn kết và gắn bó trong cộng đồng</p>
        <p>
          Hoạt động thiện nguyện là một hoạt động cộng đồng, tạo điểm kết nối giữa mọi người. Thông qua việc tham gia vào hoạt động này, mọi người có cơ hội gặp gỡ trao đổi và hợp tác để đạt được mục tiêu chung. Điều này góp phần tăng cường sự đoàn kết và gắn bó cộng đồng
        </p>
        <p>
          Xây dựng tinh thần nhân ái yêu thương
        </p>
        <p>Hoạt động thiện nguyện giúp lan tỏa tinh thần nhân ái và yêu thương trong cộng đòng. khi mọi người cùng nhau thao gia hoạt động này, họ trải nghiệm niềm vui từ việc giúp đỡ người khác</p>
      </div>
    </div>
  );
}

export default AboutUs;
