import React, { useState } from "react";
import styles from "./footer.module.scss";
import logo from "../../assets/images/expandedLogo.png";
import { Input, Button } from "antd";
import { postsClient } from "./Footer.api"; // Thay đổi đường dẫn tới hàm postsClient

const Footer: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [information, setinformation] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch(name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'information':
        setinformation(value);
        break;
    }
  };

  const handleSubmit = () => {
    postsClient(name, phone, email, information);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.column}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Company Logo" className={styles.logo} />
          <p className={styles.companyName}>
            QUỸ TỪ THIỆN BẢO PHONG
          </p>
        </div>
      </div>
      <div className={styles.column}>
        <h3>GIỚI THIỆU</h3>
        <ul className={styles.contactInfo}>
          <li>Tầm nhìn sứ mệnh</li>
          <li>Thư ngỏ</li>
        </ul>
      </div>
      <div className={styles.column}>
        <h3>TIN TỨC</h3>
        <ul className={styles.contactInfo}>
          <li>Sự kiện</li>
          <li>Truyền thông, báo chí</li>
        </ul>
      </div>
      <div className={styles.column}>
        <h3>HOẠT ĐỘNG</h3>
        <ul className={styles.contactInfo}>
          <li>Hoạt động thiện nguyện</li>
          <li>Chăm sóc sức khỏe cộng đồng</li>
          <li>An sinh xã hội</li>
          <li>Hoạt động tài trợ</li>
        </ul>
      </div>
      <div className={styles.column}>
        <h3>KẾT NỐI VỚI CHÚNG TÔI</h3>
        <div className={styles.inputContainer}>
          <Input
            placeholder="Họ và tên"
            name="name"
            value={name}
            onChange={handleChange}
            size="large"
          />
          <Input
            placeholder="Số điện thoại"
            name="phone"
            value={phone}
            onChange={handleChange}
            size="large"
          />
          <Input
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            size="large"
          />
          <Input
            placeholder="Thông tin cần giúp đỡ"
            name="information"
            value={information}
            onChange={handleChange}
            size="large"
          />
          <Button
            className={styles.subscribeButton}
            type="primary"
            onClick={handleSubmit}
          >
            Gửi
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
