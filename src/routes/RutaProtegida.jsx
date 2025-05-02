// src/routes/RutaProtegida.jsx
import { Navigate } from "react-router-dom";
import { isLoggedIn, isAdmin } from "../config/auth";

const RutaProtegida = ({ children, soloAdmin = false }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  if (soloAdmin && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RutaProtegida;
