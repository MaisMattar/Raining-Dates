/** @format */

/** @jsxRuntime classic */
/** @jsx jsx */

import { useState, useEffect } from "react";
import firebase from "firebase";
import { FunctionComponent } from "react";
import { css, jsx } from "@emotion/react";
import { dateToString } from "../../Utilities";

const profileInfoStyle = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
`;

const text = css`
  font-size: 23px;
  margin-bottom: 10px;
`;

interface ProfileInfoProps {
  email: string;
}

export const ProfileInfo: FunctionComponent<ProfileInfoProps> = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [education, setEducation] = useState("");
  const [workplace, setWorkplace] = useState("");

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
      <div css={text} key={info.label}>
        {info.label}: {info.value}
      </div>
    );
  });

  return <div css={profileInfoStyle}>{information}</div>;
};
