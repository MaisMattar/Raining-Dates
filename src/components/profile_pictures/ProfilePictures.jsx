/** @format */

import "./profilepictures.css";
import firebase from "firebase";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";

export default function ProfilePictures(props) {
  const [profilePictures, setProfilePictures] = useState([]);

  const PictureList = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    grid-gap: 1em;
  `;

  const Picture = styled.img`
    width: 170px;
    height: 170px;
    border-radius: 10px;
    -webkit-box-shadow: 4px 3px 6px 2px rgba(0, 0, 0, 0.76);
    box-shadow: 4px 3px 6px 2px rgba(0, 0, 0, 0.76);
    object-fit: cover;
  `;

  useEffect(() => {
    const docRef = firebase.firestore().collection("users").doc(props.email);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const documentData = doc.data();
          setProfilePictures(documentData.images);
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
        <Picture src={picture} alt={index}></Picture>
      </li>
    );
  });

  return (
    <div>
      <PictureList>{pictures}</PictureList>
    </div>
  );
}
