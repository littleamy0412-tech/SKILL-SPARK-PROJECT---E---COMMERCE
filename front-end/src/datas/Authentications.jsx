// import { createContext, useContext, useEffect, useState } from "react";

import { createContext, useContext, useEffect, useState } from "react";

// const AuthC = createContext();

// export default function AUTHENTICATE({ children }) {
//   const [token, setToken] = useState(undefined);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     try {
//       setToken(JSON.parse(localStorage.getItem("token")));
//     } catch {
//       setToken((prev) => prev);
//     }
//   }, []);

//   useEffect(() => {
//     try {
//       setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
//     } catch {
//       setIsLoggedIn((prev) => prev);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("token", token);
//   }, [token]);

//   useEffect(() => {
//     localStorage.setItem("isLoggedIn", isLoggedIn);
//   }, [isLoggedIn]);

//   return (
//     <>
//       <AuthC.Provider value={{ token, setToken, isLoggedIn, setIsLoggedIn }}>
//         {children}
//       </AuthC.Provider>
//     </>
//   );
// }

// export const useAuth = () => useContext(AuthC);

const AuthC = createContext();

export default function AUTHENTICATE({ children }) {
  const [token, setToken] = useState(() => {
    try {
      console.log("case 1");
      console.log(token);
      console.log(localStorage);
      return localStorage.getItem("token")
    } catch {
      return undefined;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      console.log("case 1");

      console.log(isLoggedIn);
      console.log(localStorage);
      return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      <AuthC.Provider value={{ token, setToken, isLoggedIn, setIsLoggedIn }}>
        {children}
      </AuthC.Provider>
    </>
  );
}

export const useAuth = () => useContext(AuthC);
