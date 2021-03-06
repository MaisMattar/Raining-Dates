/** @format */

import ProfilePictures from "../../components/profile_pictures/ProfilePictures";
import ProfileInfo from "../../components/profile_info/ProfileInfo";
import "./profile.css";
import { Favorite, NotInterested } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import { useState, useEffect } from "react";
import { useAuth } from "../../components/contexts/AuthContext";
import { IfFirebaseUnAuthed } from "@react-firebase/auth";

export default function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [interested, setInterested] = useState(false);
  const [notInterested, setNotInterested] = useState(false);
  const { currentUser } = useAuth();

  let { email } = useParams();

  const checkIfNotInterested = () => {
    firebase
      .firestore()
      .collection("notInterested")
      .doc(currentUser.email)
      .get()
      .then((doc) => {
        const documentData = doc.data();
        if (documentData.profiles.includes(email)) setNotInterested(true);
      });
  };

  const checkIfInterested = () => {
    firebase
      .firestore()
      .collection("interested")
      .doc(currentUser.email)
      .get()
      .then((doc) => {
        const documentData = doc.data();
        if (documentData.profiles.includes(email)) setInterested(true);
        else checkIfNotInterested();
      });
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(email)
      .get()
      .then((doc) => {
        console.log("log");
        const documentData = doc.data();
        setFirstName(documentData.first_name);
        setLastName(documentData.last_name);
      });

    checkIfInterested();
  }, []);

  const addProfileToCollection = (collectionToAdd, collectionToRemove) => {
    firebase
      .firestore()
      .collection(collectionToAdd)
      .doc(currentUser.email)
      .update({
        profiles: firebase.firestore.FieldValue.arrayUnion(email),
      });

    firebase
      .firestore()
      .collection(collectionToRemove)
      .doc(currentUser.email)
      .update({
        profiles: firebase.firestore.FieldValue.arrayRemove(email),
      });
  };

  const handleInterested = (e) => {
    if (!interested) {
      setInterested(true);
      setNotInterested(false);
      addProfileToCollection("interested", "notInterested");
    }
  };

  const handleNotInterested = (e) => {
    if (!notInterested) {
      setNotInterested(true);
      setInterested(false);
      addProfileToCollection("notInterested", "interested");
    }
  };

  return (
    <>
      <div className="profileText">
        {firstName} {lastName}'s Profile
      </div>
      <div className="profileContainer">
        <div className="profileLeft">
          <ProfilePictures email={email.toString()} />
        </div>
        <div className="profileRight">
          <ProfileInfo email={email.toString()} />
        </div>
      </div>
      <div className="profileButtons">
        <IconButton onClick={handleInterested} className="profileInterested">
          <Favorite
            className={interested ? "favoriteIconClicked" : "favoriteIcon"}
          />
        </IconButton>
        <IconButton
          onClick={handleNotInterested}
          className="profileNotInterested"
        >
          <NotInterested
            className={
              notInterested ? "notInterestedIconClicked" : "notInterestedIcon"
            }
          />
        </IconButton>
      </div>
    </>
  );
}
