"use client";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

export const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  // Fetching
  useEffect(() => {}, []);

  return (
    <GlobalContext.Provider
      value={{
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
