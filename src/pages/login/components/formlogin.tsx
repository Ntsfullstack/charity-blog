import React, { useState } from "react";
import { Form, Input, Checkbox, Button } from "antd";
import { Login } from "../api/login.api";
import { LoginParams } from "../types/type";
import { useNavigate } from "react-router-dom";
const FormLogin = () => {
  const navigate = useNavigate();



  const onFinish = async (values: LoginParams) => {
    try {
      const response = await Login(values);
      if(response.status === "success"){
        navigate("/auth");
      }
    } catch (error: any) {  
      console.error("Login Error:", error.message);
    }
  };
  
  const onFinishFailed = (errors: any) => {
    console.log("Failed:", errors);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormLogin;
