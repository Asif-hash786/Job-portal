import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useSelector((store) => store.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    switch (user.role) {
      case "student":
        return <Navigate to="/" replace />;
      case "recruiter":
        return <Navigate to="/admin/companies" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // Authorized
  return children;
};

export default ProtectedRoute;
