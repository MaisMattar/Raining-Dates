/**
 * @format
 */

import { AccountBox, Chat, ExitToApp } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../components/contexts/AuthContext";
import styled from "@emotion/styled";
import { FunctionComponent } from "react";

export const Topbar: FunctionComponent = () => {
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

  const HomeLink = styled(Link)`
    text-decoration: none;
  `;

  const Left = styled.div`
    flex: 5;
  `;

  const IconLink = styled(Link)`
    color: "white";
  `;

  return (
    <Container>
      <Left>
        <HomeLink to="/">
          <Logo>Raining Dates</Logo>
        </HomeLink>
      </Left>
      <Right>
        {currentUser && (
          <Icons>
            <IconItem>
              <IconLink to="/myprofile">
                <AccountBox />
              </IconLink>
            </IconItem>
            <IconItem>
              <Chat />
            </IconItem>
            <IconItem>
              <IconLink to="/login">
                <ExitToApp onClick={handleLogout} />
              </IconLink>
            </IconItem>
          </Icons>
        )}
      </Right>
    </Container>
  );
};
