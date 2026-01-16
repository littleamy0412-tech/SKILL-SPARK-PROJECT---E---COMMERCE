import { createContext, useContext, useEffect, useState } from "react";

const User = createContext();

export default function USERDATA({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("__u");
    if(saved) setUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("__u", JSON.stringify(user));
  }, [user]);

  return (
    <>
      <User.Provider value={{ user, setUser }}>{children}</User.Provider>
    </>
  );
}

export const useUser = () => useContext(User);
