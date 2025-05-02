// src/config/auth.js

export const isAdmin = () => {
  try {
    const rol = JSON.parse(sessionStorage.getItem("rol"));
    return rol === "admin";
  } catch {
    return false;
  }
};

export const isLoggedIn = () => {
  return !!sessionStorage.getItem("token");
};

export const getUserName = () => {
  try {
    return JSON.parse(sessionStorage.getItem("nombreUsuario")) || "";
  } catch {
    return "";
  }
};


export const logout = () => {
  sessionStorage.clear();
};
