/** @format */

import React, { FunctionComponent } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

interface PublicRouteProps extends RouteProps {}

export const PublicRoute: FunctionComponent<PublicRouteProps> = ({
  ...rest
}) => {
  const { currentUser } = useAuth();

  if (currentUser !== null) return <Redirect to="/" />;
  return <Route {...rest} />;
};
