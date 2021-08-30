/**
 * @format
 */

import { Link } from "react-router-dom";
import firebase from "firebase";
import { useState, useEffect } from "react";
import { useAuth } from "../../components/contexts/AuthContext";
import styled from "@emotion/styled";

interface Group {
  text: string;
  startAge: number;
  endAge: number;
}

interface Props {
  ageGroup: Group;
}

export default function AgeGroup(props: Props) {
  const [peopleProfiles, setPeopleProfiles] = useState<
    Array<firebase.firestore.DocumentData>
  >([]);
  const { currentUser } = useAuth();

  const AgeGroupText = styled.div`
    margin-top: 30px;
    font-size: 50px;
    margin-left: 50px;
    color: rgb(62, 121, 170);
    font-weight: bold;
  `;

  const PeopleList = styled.div`
    list-style: none;
    justify-content: space-around;
    display: grid;
    margin: 30px auto 30px;
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    grid-gap: 1em;
  `;

  const PeoplePicture = styled.img`
    width: 170px;
    height: 170px;
    border-radius: 10px;
    -webkit-box-shadow: 4px 3px 6px 2px rgba(0, 0, 0, 0.76);
    box-shadow: 4px 3px 6px 2px rgba(0, 0, 0, 0.76);
    cursor: pointer;
    object-fit: cover;
  `;

  const ListItem = styled.li`
    position: relative;
    margin-top: 30px;
  `;

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
        const people = Array<firebase.firestore.DocumentData>([]);
        querySnapshot.forEach((doc) => {
          const documentData = doc.data();
          if (documentData.email !== currentUser.email)
            people.push(documentData);
        });
        setPeopleProfiles(people);
      });
  }, [props.ageGroup.startAge, props.ageGroup.endAge, currentUser.email]);

  const pictures = peopleProfiles.map((personProfile, index) => {
    return (
      <ListItem key={personProfile.email}>
        <Link to={"/profile/" + personProfile.email}>
          <PeoplePicture
            src={personProfile.images[0]}
            alt={personProfile.images[0]}
          ></PeoplePicture>
        </Link>
      </ListItem>
    );
  });

  return (
    <div>
      <AgeGroupText>{props.ageGroup.text}</AgeGroupText>
      <PeopleList>{pictures}</PeopleList>
    </div>
  );
}
