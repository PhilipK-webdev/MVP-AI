import { useState, useEffect } from "react";
import { StateContext } from "./CustomContext";
// Create a Context for the theme
// export const StateContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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
    const response = await fetch(`${API_BASE_URL}/config`);
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
        const response = await fetch(`${API_BASE_URL}/user/?id=${uuid}`);
        if (response.status !== 200) {
          throw new Error("Bad request");
        }
        const _userData = await response.json();
        setUserData(_userData);
      } catch (error) {
        console.log("inside error");
        console.log(error);
      }
    }
  };

  return (
    <StateContext.Provider
      value={{
        config,
        setSelectedId,
        selectedId,
        userId,
        userData,
        setUserData,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
