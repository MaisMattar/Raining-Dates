/** @format */

import "./myprofileinfo.css";
import firebase from "../../firebase";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function MyProfileInfo() {
  const { currentUser } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState(null);
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
        setFirstName(documentData.first_name);
        setLastName(documentData.last_name);
        setDate(documentData.date_of_birth);
        setEducation(documentData.education);
        setWorkplace(documentData.workplace);
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
      <div>
        {info.label}: {info.value}
      </div>
    );
  });

  return (
    <div>
      <form noValidate autoComplete="off" className="form">
        {information}
      </form>
    </div>
  );
}
