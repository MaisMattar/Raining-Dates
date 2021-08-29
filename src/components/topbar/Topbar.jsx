/** @format */

import "./topbar.css";
import { AccountBox, Chat, ExitToApp } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../components/contexts/AuthContext";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

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

  return (
    <Container>
      <div css={{ flex: 5 }}>
        <Link className="topbarHomeLink" to="/">
          <span className="logo">Raining Dates</span>
        </Link>
      </div>
      <div className="topbarRight">
        {currentUser && (
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Link className="topbarIconLink" to="/myprofile">
                <AccountBox />
              </Link>
            </div>
            <div className="topbarIconItem">
              <Chat />
            </div>
            <div className="topbarIconItem">
              <Link className="topbarIconLink" to="/login">
                <ExitToApp onClick={handleLogout} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
