import React, { createContext, useContext } from "react";
import { useBLE } from "../hooks/useBLE";

const BLEContext = createContext(null);

export const BLEProvider = ({ children }) => {
  const ble = useBLE();
  return <BLEContext.Provider value={ble}>{children}</BLEContext.Provider>;
};

export const useBLEContext = () => {
  const context = useContext(BLEContext);
  if (!context) {
    throw new Error("useBLEContext must be used inside a BLEProvider");
  }
  return context;
};