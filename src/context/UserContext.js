import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// User Context
const UserContext = createContext();

// User Provider
export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Load data from localStorage as component is mounted
    const storedUserProfile = localStorage.getItem('userProfile');
    if (storedUserProfile) {
      setUserProfile(JSON.parse(storedUserProfile));
    }
  }, []);

  const login = (userData) => {
    setUserProfile(userData);
    // Optionally, you can save the userProfile in localStorage or sessionStorage
    localStorage.setItem("userProfile", JSON.stringify(userData));
  };

  const logout = () => {
    setUserProfile(null);
    localStorage.removeItem("userProfile");
  };

  return (
    <UserContext.Provider value={{ userProfile, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// PropTypes for UserProvider
UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };