import React, { useState } from "react";
import styles from "./footer.module.scss";
import logo from "../../assets/images/expandedLogo.png";
import { Input, Button } from "antd";
import { postsClient } from "./Footer.api"; // Thay đổi đường dẫn tới hàm postsClient
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

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
      <div className={styles.shape}></div>
      <div className={styles.column}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Company Logo" className={styles.logo} />
          <p className={styles.companyName}>
            {t('BAO PHONG CHARITY FUND')}
          </p>
        </div>
      </div>
      <div className={styles.column}>
        <h3>{t('about')}</h3>
        <ul className={styles.contactInfo}>
          <li>{t('vision-mission')}</li>
          <li>{t('open letter')}</li>
        </ul>
      </div>
      <div className={styles.column}>
        <h3>{t('news')}</h3>
        <ul className={styles.contactInfo}>
          <li>{t('event')}</li>
          <li>{t('communication, journalism')}</li>
        </ul>
      </div>
      <div className={styles.column}>
        <h3>{t('activity')}</h3>
        <ul className={styles.contactInfo}>
          <li>{t('volunteer')}</li>
          <li>{t('health')}</li>
          <li>{t('social security')}</li>
          <li>{t('sponsor')}</li>
        </ul>
      </div>
      <div className={styles.column}>
        <h3>{t('contact us')}</h3>
        <div className={styles.inputContainer}>
          <Input
            placeholder={t('name')}
            name="name"
            value={name}
            onChange={handleChange}
            size="large"
          />
          <Input
            placeholder={t('phone')}
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
            placeholder={t('information')}
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
            {t('send')}
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
