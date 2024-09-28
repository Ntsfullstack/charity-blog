import React, { useState } from "react";
import styles from "./footer.module.scss";
import logo from "../../assets/images/expandedLogo.png";
import { Input, Button } from "antd";
import { postsClient } from "./Footer.api";
import { t } from "i18next";
import { toast } from "react-toastify";
import facebook from "../../assets/icons/logo-facebook.svg";
import youtube from "../../assets/icons/logo-youtube.svg";
import mail from "../../assets/icons/logo-mail.svg";

const Footer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    question: "",
  });
  const { TextArea } = Input;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    postsClient(formData)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.message);
          setFormData({ name: "", phone: "", email: "", question: "" });
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
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logoSection}>
            <img src={logo} alt="Company Logo" className={styles.logo} />
            <h2>{t("BAO PHONG CHARITY FUND")}</h2>
          </div>
          <div className={styles.linksSection}>
            <div className={styles.linkColumn}>
              <h3>{t("about")}</h3>
              <a href="#">{t("vision-mission")}</a>
              <a href="#">{t("open letter")}</a>
            </div>
            <div className={styles.linkColumn}>
              <h3>{t("news")}</h3>
              <a href="#">{t("event")}</a>
              <a href="#">{t("communication, journalism")}</a>
            </div>
            <div className={styles.linkColumn}>
              <h3>{t("activity")}</h3>
              <a href="#">{t("volunteer")}</a>
              <a href="#">{t("health")}</a>
              <a href="#">{t("social security")}</a>
              <a href="#">{t("sponsor")}</a>
            </div>
          </div>
          <div className={styles.contactSection}>
            <h3>{t("contact us")}</h3>
            <form className={styles.contactForm}>
              <Input
                placeholder={t("name")}
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                placeholder={t("phone")}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <Input
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextArea
                placeholder={t("information")}
                name="question"
                value={formData.question}
                onChange={handleChange}
                rows={4}
              />
              <Button type="primary" onClick={handleSubmit}>
                {t("send")}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <p>© 2024 BAO PHONG CHARITY FUND. All rights reserved</p>
        <div className={styles.socialIcons}>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={facebook} alt="Facebook" />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={youtube} alt="Youtube" />
          </a>
          <a
            href="https://www.gmail.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={mail} alt="Mail" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
