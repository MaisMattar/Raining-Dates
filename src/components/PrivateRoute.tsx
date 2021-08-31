/** @format */

import React, { Component, FunctionComponent } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

interface PrivateRouteProps extends RouteProps {}

export const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  ...rest
}) => {
  const { currentUser } = useAuth();

  if (currentUser === null) return <Redirect to="/login" />;
  return <Route {...rest} />;
  // return (
  //   <Route
  //     {...rest}
  //     render={(p) => {
  //       return currentUser ? (
  //         <Component {...props} />
  //       ) : (
  //         <Redirect to="/login" />
  //       );
  //     }}
  //   ></Route>
  // );
};
