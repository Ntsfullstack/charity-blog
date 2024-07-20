
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./redux-setup/redux";
import Router from "./routes/Router";
import "./style/index.module.scss";

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
