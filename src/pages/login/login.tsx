import React from "react";
import FormLogin from "./components/formLogin/formlogin";
import styles from "./login.module.scss";
import Logo from "../../assets/images/expandedLogo.png";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.backdrop} />
      <div className={styles.card}>
        <div className={styles.logo}>
          <img src={Logo} alt="logo" />
        </div>
        <FormLogin />
      </div>
    </div>
  );
};

export default Login;
