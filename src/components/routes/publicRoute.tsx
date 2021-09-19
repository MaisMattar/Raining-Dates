/** @format */

import React, { FunctionComponent } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";

interface PublicRouteProps extends RouteProps {}

export const PublicRoute: FunctionComponent<PublicRouteProps> = ({
  ...rest
}) => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.updateUserStatus.isLoggedIn
  );

  if (isLoggedIn) return <Redirect to="/" />;
  return <Route {...rest} />;
};
