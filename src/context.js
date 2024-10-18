// context.js
import { createContext, useContext } from "react";

const GlobalContext = createContext();

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export { GlobalContext };