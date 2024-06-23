import React from "react";
import { Form, Input, Button, message } from "antd";
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
      console.log(response.status);
      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response));
        navigate("/auth/manager-blog");
      } else {
        console.error("Failed to set token in localStorage");
        message.error("Login failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Login Error:", error.message);
      message.error("Login failed. Please try again.");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ remember: true }}
    >
      <div className={styles.header}>
        <h1 className={styles.header__title}>Đăng nhập</h1>
      </div>
      <Form.Item
        name="username"
        label="Username:"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="Enter your username" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password:"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Enter your password" />
      </Form.Item>
      <div className={styles.buttonGroup}>
        <Button type="primary" htmlType="submit">
          Sign In
        </Button>
      </div>
    </Form>
  );
};

export default FormLogin;
