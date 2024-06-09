import React, { useState } from "react";
import { Form, Input, Checkbox, Button } from "antd";
import { Login } from "../../api/login.api";
import { LoginParams } from "../../types/type";
import { useNavigate } from "react-router-dom";
import styles from "./formLogin.module.scss";
const FormLogin = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values: LoginParams) => {
    try {
      const response = await Login(values);
      console.log("Login Success:", response.status);
      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data));
        navigate("/auth");
      }
    } catch (error: any) {
      console.error("Login Error:", error.message);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <div className={styles.header}>
        <h1 className={styles.header__title}>title</h1>
        <p className={styles.header__description}>des</p>
      </div>
      <Form.Item name={"username"} label="">
        <Input placeholder="" />
      </Form.Item>
      <Form.Item name={"password"} label="">
        <Input.Password placeholder="" />
      </Form.Item>
      <div className={styles.buttonGroup}>
        <Button type="primary" htmlType="submit">
          Sign In
        </Button>
      </div>
      <div className={styles.notice}>
        <p>{}</p>
      </div>
    </Form>
  );
};

export default FormLogin;
