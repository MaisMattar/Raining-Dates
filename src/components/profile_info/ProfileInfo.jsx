/** @format */

import "./profileinfo.css";
import { useState, useEffect } from "react";
import firebase from "firebase";

export default function ProfileInfo(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [education, setEducation] = useState("");
  const [workplace, setWorkplace] = useState("");

  const dateToString = (date) => {
    let day = date.getDate();
    day = day < 10 ? "0" + day : day;
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    const year = date.getFullYear();
    return day + "/" + month + "/" + year;
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(props.email)
      .get()
      .then((doc) => {
        const documentData = doc.data();
        const date = documentData.date_of_birth.toDate();
        setFirstName(documentData.first_name);
        setLastName(documentData.last_name);
        setDate(dateToString(date));
        setEducation(documentData.education);
        setWorkplace(documentData.workplace);
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
      <div key={info.label} className="myProfileInfoText">
        {info.label}: {info.value}
      </div>
    );
  });

  return <div className="profileInfo">{information}</div>;
}
