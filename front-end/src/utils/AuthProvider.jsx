import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({
  user: null,
  handleLogin: (token) => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error);
        handleLogout();
      }
    }
  }, []);

  const handleLogin = (token) => {
    try {
      const decodedUser = jwtDecode(token);
      localStorage.setItem("userEmail", decodedUser.sub);
      localStorage.setItem("userId", decodedUser.userId);
      localStorage.setItem("userRole", decodedUser.roles);
      localStorage.setItem("token", token);
      setUser(decodedUser);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
