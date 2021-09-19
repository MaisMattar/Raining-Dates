/** @format */

import React, { FunctionComponent } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

interface PrivateRouteProps extends RouteProps {}

export const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  ...rest
}) => {
  const { currentUser } = useAuth();

  if (currentUser === null) return <Redirect to="/login" />;
  return <Route {...rest} />;
};
