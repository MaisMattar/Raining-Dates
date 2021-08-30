/**
 * @format
 */

import { Button } from "react-bootstrap";
import MyProfileInfo from "../../components/my_profile_info/MyProfileInfo";
import MyProfilePictures from "../../components/my_profile_pictures/MyProfilePictures";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";

export default function MyProfile() {
  const history = useHistory();

  const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    flex-wrap: wrap;
  `;

  const MainText = styled.div`
    text-align: center;
    margin-top: 30px;
    font-size: 30px;
    color: rgb(62, 121, 170);
    font-weight: bold;
  `;

  const Left = styled.div`
    flex: 1;
  `;

  const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
  `;
  const EditButton = styled(Button)`
    height: 45px;
    width: 150px;
    border-radius: 10px;
    margin-top: 15px;
  `;

  function handleEditProfile(event) {
    history.push("/edit-profile");
  }

  return (
    <>
      <MainText>Your Profile</MainText>
      <Container>
        <Left>
          <MyProfilePictures />
        </Left>
        <Right>
          <MyProfileInfo />
          <EditButton onClick={handleEditProfile}>Edit Profile</EditButton>
        </Right>
      </Container>
    </>
  );
}
