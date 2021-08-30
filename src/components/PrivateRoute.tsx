/** @format */

import React, { Component, FunctionComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

interface RouteProps {
  component: Component,
  componentProps: object,
  rest: Array<any>
}

export const PrivateRoute : FunctionComponent<RouteProps> = ({ component: Component, props, ...rest }) {
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
