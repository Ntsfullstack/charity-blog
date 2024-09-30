import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import FormLogin from "./components/formLogin/formlogin";
import styles from "./login.module.scss";
import Logo from "../../assets/images/expandedLogo.png";

const Login = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.backdrop} />
      <div className={styles.card}>
        <button className={styles.backButton} onClick={handleBack}>
          <ArrowLeftOutlined /> Quay lại
        </button>
        <div className={styles.logo}>
          <img src={Logo} alt="logo" />
        </div>
        <h1 className={styles.title}>Đăng nhập</h1>
        <p className={styles.description}>Chào mừng bạn trở lại! Vui lòng đăng nhập để tiếp tục.</p>
        <FormLogin />
      </div>
    </div>
  );
};

export default Login;
