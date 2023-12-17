import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protected = ({ children }) => {
  let auth =
    JSON.parse(window.sessionStorage.getItem("userInfo")) !== null
      ? true
      : false;
  return auth ? <>{children}</> : <Navigate to="/login" />;
};

export default Protected;
