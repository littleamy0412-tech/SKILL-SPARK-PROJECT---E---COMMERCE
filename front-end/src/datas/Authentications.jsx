import { createContext, useContext, useEffect, useState } from "react";

const AuthC = createContext();

export default function AUTHENTICATE({ children }) {
  const [__, setConf] = useState({
    __log: false,
    __t: undefined,
  });

  useEffect(() => {
    const saved = localStorage.getItem("__");
    if (saved) setConf(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("__", JSON.stringify(__));
  }, [__]);

  const setToken = (token) => {
    setConf((prev) => ({ ...prev, __t: token || undefined }));
  };
  const toggleLog = (value) => {
    setConf((prev) => ({ ...prev, __log: value || false }));
  };

  return (
    <AuthC.Provider value={{ __, setToken, toggleLog }}>
      {children}
    </AuthC.Provider>
  );
}

export const useAuth = () => useContext(AuthC);
