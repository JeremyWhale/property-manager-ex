import { createContext, useState, useContext } from "react";

export const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("currentUser")
  );

  const [propertyToEdit, setPropertyToEdit] = useState('')
  const [propertyTenant, setPropertyTenant] = useState('')
  const [tenantToEdit, setTenantToEdit] = useState('')
  const [issueToEdit, setIssueToEdit] = useState('')
  const [propertySelected, setPropertySelected] = useState('')

  const value = {
    currentUser,
    setCurrentUser,
    propertyToEdit,
    setPropertyToEdit,
    propertyTenant,
    setPropertyTenant,
    tenantToEdit,
    setTenantToEdit,
    issueToEdit,
    setIssueToEdit,
    propertySelected,
    setPropertySelected,
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
