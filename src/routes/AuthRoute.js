// UnProtectedRoute.js
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import LoadingScreen from "../components/LoadingScreen";

const UnAuthRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <LoadingScreen />
  }

  return user ? children : <Navigate to="/" />;
};

export default UnAuthRoute;