import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  role: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, role }) => {
  const login = useSelector((state: any) => state.login);
  const userType = useSelector((state: any) => state.userType);


  if (Object.keys(login).length === 0) {
    return <Navigate to="/" />;
  }

  if (
    role.length > 0 &&
    !(
      (userType.admin && role.includes("admin")) ||
      (userType.user && role.includes("user"))
    )
  ) {
    if (userType.admin) {
      return <Navigate to="/dashboard" />;
    } else if (userType.user) {
      return <Navigate to="/products" />;
    }
  }

  return children;
};

export default PrivateRoute;
