import React, { useState } from "react";
import styles from "./footer.module.scss";
import logo from "../../assets/images/expandedLogo.png";
import { Input, Button } from "antd";
import { postsClient } from "./Footer.api";
import { t } from 'i18next';
import { toast } from "react-toastify";

const Footer: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const { TextArea } = Input;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    switch(name) {
      case 'name': setName(value); break;
      case 'phone': setPhone(value); break;
      case 'email': setEmail(value); break;
      case 'question': setQuestion(value); break;
    }
  };

  const handleSubmit = () => {
    postsClient({name, phone, email, question})
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.message);
          setName(""); setPhone(""); setEmail(""); setQuestion("");
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred.");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.shape}></div>
      <footer className={styles.footer}>
        <div className={styles.column}>
          <div className={styles.logoContainer}>
            <img src={logo} alt="Company Logo" className={styles.logo} />
            <p className={styles.companyName}>{t('BAO PHONG CHARITY FUND')}</p>
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
            <Input placeholder={t('name')} name="name" value={name} onChange={handleChange} />
            <Input placeholder={t('phone')} name="phone" value={phone} onChange={handleChange} />
            <Input placeholder="Email" name="email" value={email} onChange={handleChange} />
            <TextArea placeholder={t('information')} name="question" value={question} onChange={handleChange} rows={4} />
            <Button className={styles.subscribeButton} type="primary" onClick={handleSubmit}>
              {t('send')}
            </Button>
          </div>
        </div>
      </footer>
      <div className={styles.social}>
        <h3>2024 BAO PHONG CHARITY FUND. All rights reserved.</h3>
        <div className={styles.socialContainer}>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000" alt="Facebook" className={styles.socialLogo} />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/?size=100&id=19318&format=png&color=000000" alt="YouTube" className={styles.socialLogo} />
          </a>
          <a href="https://www.gmail.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/?size=100&id=P7UIlhbpWzZm&format=png&color=000000" alt="Gmail" className={styles.socialLogo} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;