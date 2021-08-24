/** @format */

import "./agegroup.css";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useState, useEffect } from "react";
import { useAuth } from "../../components/contexts/AuthContext";

export default function AgeGroup(props) {
  const [peopleProfiles, setPeopleProfiles] = useState([]);
  const { currentUser } = useAuth();

  const getDateInTimestamp = (age) => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - age);
    return firebase.firestore.Timestamp.fromDate(date);
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .where("date_of_birth", "<", getDateInTimestamp(props.ageGroup.startAge))
      .where("date_of_birth", ">=", getDateInTimestamp(props.ageGroup.endAge))
      .get()
      .then((querySnapshot) => {
        const people = [];
        querySnapshot.forEach((doc) => {
          const documentData = doc.data();
          if (documentData.email !== currentUser.email)
            people.push(documentData);
          console.log("documentData.email = ", documentData.email);
        });
        setPeopleProfiles(people);
      });
  }, [props.ageGroup.startAge, props.ageGroup.endAge, currentUser.email]);

  const pictures = peopleProfiles.map((personProfile, index) => {
    console.log("personProfile.email = ", personProfile.email);
    return (
      <li key={personProfile.email} className="peoplePictureListItem">
        <Link className="ageGroupLink" to={"/profile/" + personProfile.email}>
          <img
            src={personProfile.images[0]}
            alt={index}
            className="peoplePicture"
          ></img>
        </Link>
      </li>
    );
  });

  return (
    <div>
      <div className="ageGroupText">{props.ageGroup.text}</div>
      <ul className="peoplePictureList">{pictures}</ul>
    </div>
  );
}
