/**
 * @format
 */

/** @jsxRuntime classic */
/** @jsx jsx */

import { Link } from "react-router-dom";
import firebase from "firebase";
import { useState, useEffect, FunctionComponent } from "react";
import { useAuth } from "../../components/contexts/AuthContext";
import { jsx } from "@emotion/react";
import { ageGroupStyles } from "./AgeGroupStyles";

interface Group {
  text: string;
  startAge: number;
  endAge: number;
}

interface AgeGroupProps {
  ageGroup: Group;
}

export const AgeGroup: FunctionComponent<AgeGroupProps> = (props) => {
  const [peopleProfiles, setPeopleProfiles] = useState<
    Array<firebase.firestore.DocumentData>
  >([]);
  const { currentUser } = useAuth();
  const { text, peopleList, peoplePicture, listItem } = ageGroupStyles;

  const getDateInTimestamp = (age: number) => {
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
        const people: Array<firebase.firestore.DocumentData> = [];
        querySnapshot.forEach((doc) => {
          const documentData = doc.data();
          if (documentData.email !== currentUser.email) {
            people.push(documentData);
          }
        });
        setPeopleProfiles(people);
      });
  }, [props.ageGroup.startAge, props.ageGroup.endAge, currentUser.email]);

  const pictures = peopleProfiles.map((personProfile, index) => {
    return (
      <li css={listItem} key={personProfile.email}>
        <Link to={"/profile/" + personProfile.email}>
          <img css={peoplePicture} src={personProfile.images[0]}></img>
        </Link>
      </li>
    );
  });

  return (
    <div>
      <div css={text}>{props.ageGroup.text}</div>
      <ul css={peopleList}>{pictures}</ul>
    </div>
  );
};
