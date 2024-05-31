import React from "react";
import FormLogin from "./components/formlogin";
import HomeLayout from "../../layout/HomeLayout";

const Login = () => {
  return (
    <HomeLayout>
      <h1>Login</h1>
      <FormLogin></FormLogin>
    </HomeLayout>
  );
};

export default Login;
