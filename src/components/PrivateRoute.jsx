/** @format */

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export default function PrivateRoute({ component: Component, props, ...rest }) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(p) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
