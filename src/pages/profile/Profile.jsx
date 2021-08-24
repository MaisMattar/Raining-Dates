/** @format */

import ProfilePictures from "../../components/profile_pictures/ProfilePictures";
import ProfileInfo from "../../components/profile_info/ProfileInfo";
import "./profile.css";
import { Favorite, NotInterested } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import { useState, useEffect } from "react";

export default function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  let { email } = useParams();

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
  }, []);

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
        <IconButton className="profileInterested">
          <Favorite className="favoriteIcon" />
        </IconButton>
        <IconButton className="profileNotInterested">
          <NotInterested className="notInterestedIcon" />
        </IconButton>
      </div>
    </>
  );
}
