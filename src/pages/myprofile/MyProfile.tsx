/**
 * @format
 */
/** @jsxRuntime classic */
/** @jsx jsx */

import { Button } from "react-bootstrap";
import { MyProfileInfo } from "../../Components/MyProfileInfo/MyProfileInfo";
import { MyProfilePictures } from "../../Components/MyProfilePictures/MyProfilePictures";
import { useHistory } from "react-router-dom";
import { FunctionComponent, MouseEvent } from "react";
import { css, jsx } from "@emotion/react";
import { myProfileStyles } from "./MyProfileStyles";

export const MyProfile: FunctionComponent = () => {
  const history = useHistory();

  const { container, mainText, right, editButton } = myProfileStyles;

  function handleEditProfile(event: MouseEvent) {
    history.push("/edit-profile");
  }

  return (
    <div>
      <div css={mainText}>Your Profile</div>
      <div css={container}>
        <div
          css={css`
            flex: 1;
          `}
        >
          <MyProfilePictures />
        </div>
        <div css={right}>
          <MyProfileInfo />
          <Button css={editButton} onClick={handleEditProfile}>
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};
