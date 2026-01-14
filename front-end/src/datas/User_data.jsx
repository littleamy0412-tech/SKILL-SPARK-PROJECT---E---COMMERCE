import { createContext, useContext, useEffect, useState } from "react";

const UserCont = createContext();

export default function USERDATA({ children }) {
  const [userData, setUserData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user_data")) || {};
    } catch {
      return {};
    }
  });

  // useEffect(() => {
  //   try {
  //     setUserData(JSON.parse(localStorage.getItem("user_data")));
  //   } catch {
  //     setUserData((prev) => prev);
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem("user_data", JSON.stringify(userData));
  }, [userData]);

  return (
    <>
      <UserCont value={{ userData, setUserData }}>{children}</UserCont>
    </>
  );
}

export const useUser = () => useContext(UserCont);
