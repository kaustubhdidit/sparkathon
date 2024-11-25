"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    role: '',
    perm1: false,
    perm2: false,
    perm3: false,
    perm4: false,
    perm5: false,
    createdAt: null
  });

  // Load user from localStorage on component mount
  useEffect(() => {
    const authToken = localStorage.getItem("authData");
  
    if (authToken) {
      const base64Url = authToken.split('.')[1]; // Extract payload
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Fix Base64 encoding
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      const userData = JSON.parse(jsonPayload).user; // Get user from the payload
       console.log("Extracted")
      console.log(userData)
      if (userData) {
        setUser(userData); // Use directly without parsing again
      }
    }
  }, []);
  

  // Save user to localStorage whenever it changes
  // useEffect(() => {
  //   if (user.id !== null) { // Avoid storing the initial empty state
  //     localStorage.setItem("user", JSON.stringify(user));
  //   }
  // }, [user]);

  const updateUser = (userData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...userData,
    }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
