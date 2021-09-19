/**
 * @format
 */

/** @jsxRuntime classic */
/** @jsx jsx */

import { ProfilePictures } from "../../components/profilePictures/profilePictures";
import { ProfileInfo } from "../../components/profileInfo/profileInfo";
import { Favorite, NotInterested } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useState, useEffect, FunctionComponent, MouseEvent } from "react";
import { useAuth } from "../../components/contexts/authContext";
import styled from "@emotion/styled";
import { jsx } from "@emotion/react";
import { profileStyles } from "./profileStyles";
import {
  getProfileInfo,
  userInfo,
  checkIfInterested,
  checkIfNotInterested,
  updateNotInterested,
  updateInterested,
} from "../../FirebaseUtil";

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

  const setFullName = async () => {
    const profileInfo: userInfo = await getProfileInfo(email);
    setFirstName(profileInfo.firstName);
    setLastName(profileInfo.lastName);
  };

  const setInterest = async () => {
    const interested = await checkIfInterested(currentUser.email, email);
    console.log("interested = ", interested);
    setInterested(interested);
    if (!interested) {
      const notInterested = await checkIfNotInterested(
        currentUser.email,
        email
      );
      setNotInterested(notInterested);
    }
  };

  useEffect(() => {
    setFullName();
    setInterest();
  }, []);

  const handleInterested = async (e: MouseEvent) => {
    if (!interested) {
      await updateInterested(currentUser.email, email);
      setInterested(true);
      setNotInterested(false);
    }
  };

  const handleNotInterested = async (e: MouseEvent) => {
    if (!notInterested) {
      await updateNotInterested(currentUser.email, email);
      setNotInterested(true);
      setInterested(false);
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
