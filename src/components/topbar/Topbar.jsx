/**
 * @format
 * @jsxImportSource @emotion/react
 */

import "./topbar.css";
import { AccountBox, Chat, ExitToApp } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../components/contexts/AuthContext";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/react";

export default function Topbar() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.log("Failed to logout");
    }
  }

  const Container = styled.div`
    height: 70px;
    width: 100%;
    background-color: rgb(62, 121, 170);
    display: flex;
    align-items: center;
    position: sticky;
  `;

  const Logo = styled.span`
    font-size: 30px;
    margin-left: 20px;
    font-weight: bold;
    color: white;
    cursor: pointer;
  `;

  const Right = styled.div`
    flex: 2;
    color: white;
  `;

  const Icons = styled.div`
    display: flex;
    justify-content: flex-end;
  `;

  const IconItem = styled.div`
    margin-right: 15px;
    cursor: pointer;
  `;

  return (
    <Container>
      <div css={{ flex: 5 }}>
        <Link css={{ textDecoration: "none" }} to="/">
          <Logo>Raining Dates</Logo>
        </Link>
      </div>
      <Right>
        {currentUser && (
          <Icons>
            <IconItem>
              <Link css={{ color: "white" }} to="/myprofile">
                <AccountBox />
              </Link>
            </IconItem>
            <IconItem>
              <Chat />
            </IconItem>
            <IconItem>
              <Link css={{ color: "white" }} to="/login">
                <ExitToApp onClick={handleLogout} />
              </Link>
            </IconItem>
          </Icons>
        )}
      </Right>
    </Container>
  );
}
