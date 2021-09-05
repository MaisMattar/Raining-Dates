/**
 * @format
 */

/** @jsxRuntime classic */
/** @jsx jsx */

import { ProfilePictures } from "../../components/profile_pictures/ProfilePictures";
import { ProfileInfo } from "../../components/profile_info/ProfileInfo";
import { Favorite, NotInterested } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import { useState, useEffect, FunctionComponent, MouseEvent } from "react";
import { useAuth } from "../../components/contexts/AuthContext";
import styled from "@emotion/styled";
import { jsx } from "@emotion/react";
import { profileStyles } from "./ProfileStyles";

type ProfileParams = {
  email: string;
};

export const Profile: FunctionComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [interested, setInterested] = useState(false);
  const [notInterested, setNotInterested] = useState(false);
  const { currentUser } = useAuth();
  const { container, text, buttonsContainer, iconButton, part } = profileStyles;

  let { email } = useParams<ProfileParams>();

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
        if (documentData!.profiles.includes(email)) setNotInterested(true);
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
        if (documentData!.profiles.includes(email)) setInterested(true);
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
        setFirstName(documentData!.first_name);
        setLastName(documentData!.last_name);
      });
    checkIfInterested();
  }, []);

  const addProfileToCollection = (
    collectionToAdd: string,
    collectionToRemove: string
  ) => {
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

  const handleInterested = (e: MouseEvent) => {
    if (!interested) {
      setInterested(true);
      setNotInterested(false);
      addProfileToCollection("interested", "notInterested");
    }
  };

  const handleNotInterested = (e: MouseEvent) => {
    if (!notInterested) {
      setNotInterested(true);
      setInterested(false);
      addProfileToCollection("notInterested", "interested");
    }
  };

  return (
    <div>
      <div css={text}>
        {firstName} {lastName}'s Profile
      </div>
      <div css={container}>
        <div css={part}>
          <ProfilePictures email={email} />
        </div>
        <div css={part}>
          <ProfileInfo email={email} />
        </div>
      </div>
      <div css={buttonsContainer}>
        <IconButton css={iconButton} onClick={handleInterested}>
          <FavoriteIcon />
        </IconButton>
        <IconButton css={iconButton} onClick={handleNotInterested}>
          <NotInterestedIcon />
        </IconButton>
      </div>
    </div>
  );
};
