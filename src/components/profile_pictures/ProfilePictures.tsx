/** @format */

/** @jsxRuntime classic */
/** @jsx jsx */

import firebase from "firebase";
import { useState, useEffect, FunctionComponent } from "react";
import { css, jsx } from "@emotion/react";

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

  useEffect(() => {
    const docRef = firebase.firestore().collection("users").doc(props.email);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const documentData = doc.data();
          setProfilePictures(documentData!.images);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [props.email]);

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
