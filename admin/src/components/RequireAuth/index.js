import React from "react";
import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const [hasToken, setHasToken] = useState(localStorage.getItem("accessToken"));
  const location = useLocation();

  return hasToken && hasToken !== "" && hasToken !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default RequireAuth;
