/**
 * @format
 */

import "./myprofilepictures.css";
import { useState, useEffect, MouseEvent } from "react";
import firebase, { storage } from "../../firebase";
import { useAuth } from "../contexts/AuthContext";
import { Cancel, Image } from "@material-ui/icons";
import { Alert } from "react-bootstrap";
import styled from "@emotion/styled";

export default function ProfilePictures() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profilePictures, setProfilePictures] = useState<Array<string>>([]);
  const [error, setError] = useState("");

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

  const AddPicture = styled.div`
    width: 170px;
    height: 170px;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const DeleteButton = styled.div`
    position: relative;
    top: 16px;
    right: 10px;
    cursor: pointer;
  `;

  const RemoveAlert = styled(Alert)`
    margin-top: 40px;
    margin-left: 20px;
    width: 320px;
    text-align: center;
  `;

  const AddPictureImage = styled(Image)`
    transform: scale(3);
    cursor: pointer;
  `;

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
        <DeleteButton onClick={() => removeImage(index)}>
          <Cancel />
        </DeleteButton>
        <Picture src={picture} alt={picture}></Picture>
      </li>
    );
  });

  return (
    <div>
      <PictureList>
        {pictures}
        <li key={profilePictures.length}>
          <AddPicture>
            <label htmlFor="single">
              <AddPictureImage />
            </label>
            <input
              disabled={loading}
              type="file"
              id="single"
              onChange={handleImageUpload}
            />
          </AddPicture>
        </li>
      </PictureList>
      {error && <RemoveAlert variant="danger">{error}</RemoveAlert>}
    </div>
  );
}
