import { createContext, useState, useEffect } from "react";

// Create a Context for the theme
export const StateContext = createContext();

// Create a provider component
export const StateProvider = ({ children }) => {
  const [config, setConfigData] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  useEffect(() => {
    getConfig();
  }, []);

  const getConfig = async () => {
    const response = await fetch("/api/config");
    if (response.status !== 200) {
      return;
    }
    const result = await response.json();
    setConfigData(result);
  };

  return (
    <StateContext.Provider value={{ config, setSelectedId, selectedId }}>
      {children}
    </StateContext.Provider>
  );
};
