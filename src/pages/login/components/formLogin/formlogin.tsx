import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import React from "react";
import { Login } from "../../api/login.api";
import { LoginParams } from "../../types/type";

const FormLogin = () => {
  const onFinish = async (values: LoginParams) => {
    try {
      const response = await Login(values);
      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data));
        window.location.href = "/auth/manager-blog";
      } else {
        message.error("Login failed. Please try again.");
      }
    } catch (error: any) {
      message.error("Login failed. Please try again.");
    }
  };

  const onFinishFailed: FormProps<LoginParams>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<LoginParams>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<LoginParams>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormLogin;
