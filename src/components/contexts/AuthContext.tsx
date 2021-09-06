/** @format */

import React, {
  useContext,
  useState,
  useEffect,
  FunctionComponent,
} from "react";
import { auth } from "../../firebase";

type ContextProps = {
  currentUser: any;
  signup: any;
  login: any;
  logout: any;
  updateEmail: any;
  updatePassword: any;
};

const AuthContext = React.createContext<Partial<ContextProps>>({});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: FunctionComponent = (props) => {
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
    if (currentUser !== null) {
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
