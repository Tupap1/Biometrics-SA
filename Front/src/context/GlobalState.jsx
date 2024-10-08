import { Children, createContext } from "react";

export const context = createContext();

export const GlobalProvider = ({ children }) => {
  return <Context.provider value={{ total: 100 }}></Context.provider>;
};
