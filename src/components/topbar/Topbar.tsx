/**
 * @format
 */
/** @jsxRuntime classic */
/** @jsx jsx */

import { AccountBox, Chat, ExitToApp } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { FunctionComponent } from "react";
import { css, jsx } from "@emotion/react";
import { topbarStyles } from "./topbarStyles";

import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions";

export const Topbar: FunctionComponent = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const { container, logo, right, icons, iconItem, left, link } = topbarStyles;

  const dispatch = useDispatch();

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.log("Failed to logout");
    }

    dispatch(logoutUser());
  }

  return (
    <div css={container}>
      <div css={left}>
        <Link
          css={css`
            text-decoration: none;
          `}
          to="/"
        >
          <span css={logo}>Raining Dates</span>
        </Link>
      </div>
      <div css={right}>
        {currentUser && (
          <div css={icons}>
            <div css={iconItem}>
              <Link css={link} to="/myprofile">
                <AccountBox />
              </Link>
            </div>
            <div css={iconItem}>
              <Chat />
            </div>
            <div css={iconItem}>
              <Link css={link} to="/login">
                <ExitToApp onClick={handleLogout} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
