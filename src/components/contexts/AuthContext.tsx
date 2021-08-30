/** @format */

import React, { useContext, useState, useEffect } from "react";
import { ReactNode } from "react";
import { auth } from "../../firebase";

const AuthContext = React.createContext({ 
  authenticated: true,
  lang: 'en',
  theme: 'dark'
});

interface IProps {
  children: ReactNode
}

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: IProps) {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  function signup(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function updateEmail(email: string) {
    if(currentUser !== null){
      return currentUser.updateEmail(email);
    }
  }

  function updatePassword(password: string) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscriber = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => {
      unsubscriber();
    };
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    updateEmail,
    updatePassword,
    lang: 'de',
    authenticated: true,
    theme: 'light'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
