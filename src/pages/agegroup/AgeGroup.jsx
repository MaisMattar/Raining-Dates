/**
 * @format
 * @jsxImportSource @emotion/react
 */

import "./agegroup.css";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useState, useEffect } from "react";
import { useAuth } from "../../components/contexts/AuthContext";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

export default function AgeGroup(props) {
  const [peopleProfiles, setPeopleProfiles] = useState([]);
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
        });
        setPeopleProfiles(people);
      });
  }, [props.ageGroup.startAge, props.ageGroup.endAge, currentUser.email]);

  const pictures = peopleProfiles.map((personProfile, index) => {
    return (
      <li
        key={personProfile.email}
        css={css`
          position: relative;
          margin-top: 30px;
        `}
      >
        <Link to={"/profile/" + personProfile.email}>
          <PeoplePicture
            src={personProfile.images[0]}
            alt={index}
          ></PeoplePicture>
        </Link>
      </li>
    );
  });

  return (
    <div>
      <AgeGroupText>{props.ageGroup.text}</AgeGroupText>
      <PeopleList>{pictures}</PeopleList>
    </div>
  );
}
