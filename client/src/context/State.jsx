import { createContext, useState, useEffect } from "react";

// Create a Context for the theme
export const StateContext = createContext();

// Create a provider component
export const StateProvider = ({ children }) => {
  const [config, setConfigData] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    getConfig();
    getUserId();
  }, []);

  const getConfig = async () => {
    const response = await fetch("/api/config");
    if (response.status !== 200) {
      return;
    }
    const result = await response.json();
    setConfigData(result);
  };

  const getUserId = async () => {
    const uuid = localStorage.getItem("uuid");
    if (uuid) {
      setUserId(uuid);
      try {
        const response = await fetch(`/api/user/?id=${uuid}`);
        if (response.status !== 200) {
          throw new Error("Bad request");
        }
        const _userData = await response.json();
        setUserData(_userData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <StateContext.Provider
      value={{ config, setSelectedId, selectedId, userId, userData }}
    >
      {children}
    </StateContext.Provider>
  );
};
