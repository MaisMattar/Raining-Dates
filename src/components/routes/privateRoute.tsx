/** @format */

import React, { FunctionComponent } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";

interface PrivateRouteProps extends RouteProps {}

export const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  ...rest
}) => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.updateUserStatus.isLoggedIn
  );

  if (!isLoggedIn) return <Redirect to="/login" />;
  return <Route {...rest} />;
};
