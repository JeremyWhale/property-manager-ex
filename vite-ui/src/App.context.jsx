import { createContext, useState, useContext } from "react";

export const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("currentUser")
  );

  const value = {
    currentUser,
    setCurrentUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("No provider found when calling useAppContext");
  }

  return context;
};
