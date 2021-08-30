/** @format */

import { useState, useEffect } from "react";
import firebase from "firebase";
import styled from "@emotion/styled";

interface IProps {
  email: string;
}

export default function ProfileInfo(props: IProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [education, setEducation] = useState("");
  const [workplace, setWorkplace] = useState("");

  const ProfileInfo = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
  `;

  const ProfileText = styled.div`
    font-size: 23px;
    margin-bottom: 10px;
  `;

  const dateToString = (date: Date) => {
    const day = date.getDate();
    const dayString = day < 10 ? "0" + day : day;
    const month = date.getMonth() + 1;
    const monthString = month < 10 ? "0" + month : month;

    const year = date.getFullYear();

    return dayString + "/" + monthString + "/" + year;
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(props.email)
      .get()
      .then((doc) => {
        const documentData = doc.data();
        const date = documentData!.date_of_birth.toDate();
        setFirstName(documentData!.first_name);
        setLastName(documentData!.last_name);
        setDate(dateToString(date));
        setEducation(documentData!.education);
        setWorkplace(documentData!.workplace);
      });
  }, [props.email]);

  const profileInfo = [
    { label: "First Name", value: firstName },
    { label: "Last Name", value: lastName },
    { label: "Date of Birth", value: date },
    { label: "Education", value: education },
    { label: "Workplace", value: workplace },
  ];

  const information = profileInfo.map((info, index) => {
    return (
      <ProfileText key={info.label}>
        {info.label}: {info.value}
      </ProfileText>
    );
  });

  return <ProfileInfo>{information}</ProfileInfo>;
}
