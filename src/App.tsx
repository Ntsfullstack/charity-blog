import React, { useEffect } from "react";
import Router from "./routes/Router";
import "antd/dist/reset.css";
import "./style/index.module.scss";
import { useDispatch } from "react-redux";
import { logout } from "./redux-setup/redux";
import { useNavigate } from "react-router-dom";

const parseJwt = (token: string | undefined) => {
  if (!token) return null;

  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const user = JSON.parse(storedToken);
      const decodedJwt = parseJwt(user.token);
      console.log(decodedJwt.exp * 1000 - Date.now());
      console.log(decodedJwt && decodedJwt.exp * 1000 < Date.now());
      if (decodedJwt && decodedJwt.exp * 1000 < Date.now()) {
        dispatch(logout());
      }
    } else {
      dispatch(logout());
    }
  }, [window.location.pathname]);

  return (
    <>
      <Router />
    </>
  );
}

export default App;
