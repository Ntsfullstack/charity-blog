import React, { useState } from "react";
import styles from "./footer.module.scss";
import logo from "../../assets/images/expandedLogo.png";
import { Input, Button, Form } from "antd";
import { postsClient } from "./Footer.api";
import { t } from "i18next";
import { toast } from "react-toastify";
import facebook from "../../assets/icons/logo-facebook.svg";
import youtube from "../../assets/icons/logo-youtube.svg";
import { Toast } from "react-toastify/dist/components";
import mail from "../../assets/icons/logo-mail.svg";

const Footer: React.FC = () => {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const res = await postsClient(values);
      if (res.status === 201) {
        toast.success(res.message);
        form.resetFields();
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      console.error(error);
      if (error.errorFields) {
        error.errorFields.forEach(
          (field: { name: string[]; errors: string[] }) => {
            form.setFields([
              {
                name: field.name,
                errors: field.errors,
              },
            ]);
          }
        );
      } else {
        toast.error("Đã xảy ra lỗi.");
      }
    }
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
            <Form form={form} className={styles.contactForm} layout="vertical">
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: t("Please enter your name") },
                ]}
              >
                <Input placeholder={t("name")} />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: t("Please enter your phone number"),
                  },
                ]}
              >
                <Input placeholder={t("phone")} />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: t("Please enter your email") },
                  { type: "email", message: t("Please enter a valid email") },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="question"
                rules={[
                  { required: true, message: t("Please enter your question") },
                ]}
              >
                <TextArea placeholder={t("information")} rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={handleSubmit}>
                  {t("send")}
                </Button>
              </Form.Item>
            </Form>
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
