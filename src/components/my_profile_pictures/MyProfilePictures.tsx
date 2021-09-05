/**
 * @format
 */
/** @jsxRuntime classic */
/** @jsx jsx */

import "./myprofilepictures.css";
import { useState, useEffect } from "react";
import firebase, { storage } from "../../firebase";
import { useAuth } from "../contexts/AuthContext";
import { Cancel, Image } from "@material-ui/icons";
import { Alert } from "react-bootstrap";
import { FunctionComponent } from "react";
import { jsx } from "@emotion/react";
import { myProfPicStyles } from "./MyProfilePicturesStyles";

export const MyProfilePictures: FunctionComponent = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profilePictures, setProfilePictures] = useState<Array<string>>([]);
  const [error, setError] = useState("");
  const {
    list,
    pictureStyle,
    addPicture,
    deleteButton,
    removeAlert,
    addPicImage,
  } = myProfPicStyles;

  const docRef = firebase
    .firestore()
    .collection("users")
    .doc(currentUser.email);

  useEffect(() => {
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
  }, []);

  function removeImage(imageIndex: number) {
    if (profilePictures.length <= 1) {
      setError("You must have at least one photo!");
      setTimeout(function () {
        setError("");
      }, 5000);
      return;
    }
    const profilePicsCopy = [...profilePictures];
    profilePicsCopy.splice(imageIndex, 1);
    docRef
      .update({
        images: profilePicsCopy,
      })
      .then(() => setProfilePictures(profilePicsCopy));
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null || e.target.files[0] === null) {
      return;
    }
    const currImage = e.target.files[0];
    setLoading(true);
    const imageName = currentUser.email + currImage.name;

    const uploadImage = storage.ref(`images/${imageName}`).put(currImage);
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(imageName)
          .getDownloadURL()
          .then((url) => {
            const profilePicsCopy = [...profilePictures];
            profilePicsCopy.push(url);
            docRef
              .update({
                images: profilePicsCopy,
              })
              .then(() => {
                setLoading(false);
                setProfilePictures(profilePicsCopy);
              });
          });
      }
    );
  };

  const pictures = profilePictures.map((picture, index) => {
    return (
      <li key={index}>
        <div css={deleteButton} onClick={() => removeImage(index)}>
          <Cancel />
        </div>
        <img css={pictureStyle} src={picture} alt={picture}></img>
      </li>
    );
  });

  return (
    <div>
      <ul css={list}>
        {pictures}
        <li key={profilePictures.length}>
          <div css={addPicture}>
            <label htmlFor="single">
              <Image css={addPicImage} />
            </label>
            <input
              disabled={loading}
              type="file"
              id="single"
              onChange={handleImageUpload}
            />
          </div>
        </li>
      </ul>
      {error && (
        <Alert css={removeAlert} variant="danger">
          {error}
        </Alert>
      )}
    </div>
  );
};
