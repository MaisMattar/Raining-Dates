/**
 * @format
 */

import { ProfilePictures } from "../../components/profile_pictures/ProfilePictures";
import { ProfileInfo } from "../../components/profile_info/ProfileInfo";
import { Favorite, NotInterested } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import { useState, useEffect, FunctionComponent } from "react";
import { useAuth } from "../../components/contexts/AuthContext";
import styled from "@emotion/styled";

export const Profile: FunctionComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [interested, setInterested] = useState(false);
  const [notInterested, setNotInterested] = useState(false);
  const { currentUser } = useAuth();

  let { email } = useParams();

  const Container = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    flex-wrap: wrap;
    margin-left: 30px;
  `;

  const Part = styled.div`
    flex: 1;
  `;

  const Text = styled.div`
    text-align: center;
    margin-top: 30px;
    font-size: 30px;
    color: rgb(62, 121, 170);
    font-weight: bold;
  `;

  const ButtonsContainer = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: center;
  `;

  const ProfileIconButton = styled(IconButton)`
    margin-right: 20px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: white;
  `;

  const FavoriteIcon = styled(Favorite)`
    color: ${interested ? "rgb(248, 148, 164)" : "grey"};
    transform: ${interested ? "scale(2)" : "scale(1.8)"};
  `;

  const NotInterestedIcon = styled(NotInterested)`
    color: ${notInterested ? "blue" : "grey"};
    transform: ${notInterested ? "scale(2)" : "scale(1.8)"};
  `;

  const checkIfNotInterested = () => {
    firebase
      .firestore()
      .collection("notInterested")
      .doc(currentUser.email)
      .get()
      .then((doc) => {
        const documentData = doc.data();
        if (documentData.profiles.includes(email)) setNotInterested(true);
      });
  };

  const checkIfInterested = () => {
    firebase
      .firestore()
      .collection("interested")
      .doc(currentUser.email)
      .get()
      .then((doc) => {
        const documentData = doc.data();
        if (documentData.profiles.includes(email)) setInterested(true);
        else checkIfNotInterested();
      });
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(email)
      .get()
      .then((doc) => {
        console.log("log");
        const documentData = doc.data();
        setFirstName(documentData.first_name);
        setLastName(documentData.last_name);
      });

    checkIfInterested();
  }, []);

  const addProfileToCollection = (collectionToAdd, collectionToRemove) => {
    firebase
      .firestore()
      .collection(collectionToAdd)
      .doc(currentUser.email)
      .update({
        profiles: firebase.firestore.FieldValue.arrayUnion(email),
      });

    firebase
      .firestore()
      .collection(collectionToRemove)
      .doc(currentUser.email)
      .update({
        profiles: firebase.firestore.FieldValue.arrayRemove(email),
      });
  };

  const handleInterested = (e) => {
    if (!interested) {
      setInterested(true);
      setNotInterested(false);
      addProfileToCollection("interested", "notInterested");
    }
  };

  const handleNotInterested = (e) => {
    if (!notInterested) {
      setNotInterested(true);
      setInterested(false);
      addProfileToCollection("notInterested", "interested");
    }
  };

  return (
    <>
      <Text>
        {firstName} {lastName}'s Profile
      </Text>
      <Container>
        <Part>
          <ProfilePictures email={email.toString()} />
        </Part>
        <Part>
          <ProfileInfo email={email.toString()} />
        </Part>
      </Container>
      <ButtonsContainer>
        <ProfileIconButton onClick={handleInterested}>
          <FavoriteIcon />
        </ProfileIconButton>
        <ProfileIconButton onClick={handleNotInterested}>
          <NotInterestedIcon />
        </ProfileIconButton>
      </ButtonsContainer>
    </>
  );
};
