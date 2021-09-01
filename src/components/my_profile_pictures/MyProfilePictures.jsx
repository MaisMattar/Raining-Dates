/** @format */

import "./myprofilepictures.css";
import { useState, useEffect } from "react";
import firebase, { storage } from "../../firebase";
import { useAuth } from "../contexts/AuthContext";
import { Cancel, Image } from "@material-ui/icons";
import { Alert } from "react-bootstrap";

export default function ProfilePictures() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profilePictures, setProfilePictures] = useState([]);
  const [error, setError] = useState("");

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
          setProfilePictures(documentData.images);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  function removeImage(imageIndex) {
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

  const handleImageUpload = (e) => {
    if (!e.target.files[0]) {
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
      <li key={index} className="myPictureListItem">
        <div onClick={() => removeImage(index)} className="myDeleteButton">
          <Cancel />
        </div>
        <img src={picture} alt={index} className="myPicture"></img>
      </li>
    );
  });

  return (
    <div>
      <ul className="myPictureList">
        {pictures}
        <li key={profilePictures.size}>
          <div className="myAddPicture">
            <label htmlFor="single">
              <Image className="myProfileAddIcon" />
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
        <Alert variant="danger" className="removePictureAlert">
          {error}
        </Alert>
      )}
    </div>
  );
}
