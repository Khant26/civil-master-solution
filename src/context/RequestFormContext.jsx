import React, { createContext, useContext, useState } from 'react';

const RequestFormContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components -- the hook is colocated with its provider
export const useRequestForm = () => {
  const context = useContext(RequestFormContext);
  if (!context) {
    throw new Error('useRequestForm must be used within a RequestFormProvider');
  }
  return context;
};

export const RequestFormProvider = ({ children }) => {
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);

  const openRequestForm = () => setIsRequestFormOpen(true);
  const closeRequestForm = () => setIsRequestFormOpen(false);

  const value = {
    isRequestFormOpen,
    openRequestForm,
    closeRequestForm,
  };

  return (
    <RequestFormContext.Provider value={value}>
      {children}
    </RequestFormContext.Provider>
  );
};