/** @format */
/** @jsxRuntime classic */
/** @jsx jsx */
import firebase from "../../firebase";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FunctionComponent } from "react";
import { css, jsx } from "@emotion/react";
import { dateToString } from "../../Utilities";

const profileText = css`
  font-size: 23px;
  margin-bottom: 10px;
`;
const profileInfoStyle = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
`;

export const MyProfileInfo: FunctionComponent = () => {
  const { currentUser } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [education, setEducation] = useState("");
  const [workplace, setWorkplace] = useState("");

  const docRef = firebase
    .firestore()
    .collection("users")
    .doc(currentUser.email);

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const documentData = doc.data();
        const date = documentData!.date_of_birth.toDate();
        setFirstName(documentData!.first_name);
        setLastName(documentData!.last_name);
        setDate(dateToString(date));
        setEducation(documentData!.education);
        setWorkplace(documentData!.workplace);
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  const profileInfo = [
    { id: "firstname", label: "First Name", type: "text", value: firstName },
    { id: "lastname", label: "Last Name", type: "text", value: lastName },
    { id: "date", label: "Date of Birth", type: "date", value: date },
    { id: "email", label: "Email", type: "email", value: currentUser.email },
    { id: "education", label: "Education", type: "text", value: education },
    { id: "workplace", label: "Workplace", type: "text", value: workplace },
  ];

  const information = profileInfo.map((info, index) => {
    return (
      <div css={profileText} id={info.label}>
        {info.label}: {info.value}
      </div>
    );
  });

  return (
    <div>
      <div css={profileInfoStyle}>{information}</div>
    </div>
  );
};
