/** @format */

/** @jsxRuntime classic */
/** @jsx jsx */

import { useState, useEffect, FunctionComponent } from "react";
import { css, jsx } from "@emotion/react";
import { getProfilePictures } from "../../firebase_util";

const pictureList = css`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  grid-gap: 1em;
`;

const pictureStyle = css`
  width: 170px;
  height: 170px;
  border-radius: 10px;
  -webkit-box-shadow: 4px 3px 6px 2px rgba(0, 0, 0, 0.76);
  box-shadow: 4px 3px 6px 2px rgba(0, 0, 0, 0.76);
  object-fit: cover;
`;

interface ProfilePicturesProps {
  email: string;
}

export const ProfilePictures: FunctionComponent<ProfilePicturesProps> = (
  props
) => {
  const [profilePictures, setProfilePictures] = useState([]);

  const setUserProfilePictures = async () => {
    const images = await getProfilePictures(props.email);
    setProfilePictures(images);
  };

  useEffect(() => {
    setUserProfilePictures();
  }, []);

  const pictures = profilePictures.map((picture, index) => {
    return (
      <li key={index}>
        <img css={pictureStyle} src={picture} alt={picture}></img>
      </li>
    );
  });

  return (
    <div>
      <ul css={pictureList}>{pictures}</ul>
    </div>
  );
};
