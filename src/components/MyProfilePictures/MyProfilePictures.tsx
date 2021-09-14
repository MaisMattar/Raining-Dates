/**
 * @format
 */
/** @jsxRuntime classic */
/** @jsx jsx */

import "./myprofilepictures.css";
import { useState, useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Cancel, Image } from "@material-ui/icons";
import { Alert } from "react-bootstrap";
import { FunctionComponent } from "react";
import { jsx } from "@emotion/react";
import { myProfPicStyles } from "./MyProfilePicturesStyles";
import {
  getProfilePictures,
  updateUser,
  uploadImageToStorage,
} from "../../FirebaseUtil";

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

  const setMyProfilePictures = async () => {
    const images = await getProfilePictures(currentUser.email);
    setProfilePictures(images);
  };

  useEffect(() => {
    setMyProfilePictures();
  }, []);

  const removeImage = async (imageIndex: number) => {
    if (profilePictures.length <= 1) {
      setError("You must have at least one photo!");
      setTimeout(function () {
        setError("");
      }, 5000);
      return;
    }

    const profilePicsCopy = [...profilePictures];
    profilePicsCopy.splice(imageIndex, 1);
    await updateUser(currentUser.email, { images: profilePicsCopy });
    setProfilePictures(profilePicsCopy);
  };

  const uploadImage = async (image: File) => {
    const imageUrl = await uploadImageToStorage(
      currentUser.email + image.name,
      image
    );
    return imageUrl;
  };

  const addImageToProfile = async (imageUrl: string) => {
    const profilePicsCopy = [...profilePictures];
    profilePicsCopy.push(imageUrl);
    await updateUser(currentUser.email, { images: profilePicsCopy });
    setProfilePictures(profilePicsCopy);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null || e.target.files[0] === null) {
      return;
    }
    const currImage = e.target.files[0];
    setLoading(true);

    const imageUrl = await uploadImage(currImage);

    await addImageToProfile(imageUrl);

    setLoading(false);
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
