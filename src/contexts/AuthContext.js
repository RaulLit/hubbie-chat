import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  });
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
