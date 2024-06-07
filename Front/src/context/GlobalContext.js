import { createContext } from "react";

export const contexto = createContext;

const contextoGlobal = ({ children }) => {
  return (
    <contexto.Provider value={{ biomasa: 100 }}>{children}</contexto.Provider>
  );
};
