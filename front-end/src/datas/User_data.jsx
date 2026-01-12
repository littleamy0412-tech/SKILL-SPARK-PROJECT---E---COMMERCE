import { createContext, useContext, useEffect, useState } from "react";

const User = createContext();

export default function USERDATA({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("__u");
    if (saved && saved != ({})) setUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("__u", user);
  }, [user]);

  return (
    <>
      <User.Provider value={{ user, setUser }}>{children}</User.Provider>
    </>
  );
}

export const useUser = () => useContext(User);
