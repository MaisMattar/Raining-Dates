/** @format */

import "./profilepictures.css";
import firebase from "firebase";
import { useState, useEffect } from "react";

export default function ProfilePictures(props) {
  const [profilePictures, setProfilePictures] = useState([]);

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
      <li key={index} className="pictureListItem">
        <img src={picture} alt={index} className="picture"></img>
      </li>
    );
  });
  return (
    <div>
      <ul className="pictureList">{pictures}</ul>
    </div>
  );
}
