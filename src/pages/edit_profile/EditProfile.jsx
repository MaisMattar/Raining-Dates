/** @format */

import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useRef } from "react";
import "./editprofile.css";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../components/contexts/AuthContext";
import firebase from "../../firebase";

export default function EditProfile() {
  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const passwordRef = useRef(null);
  const educationRef = useRef(null);
  const workplaceRef = useRef(null);
  const history = useHistory();
  const { currentUser, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const docRef = firebase
    .firestore()
    .collection("users")
    .doc(currentUser.email);

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const documentData = doc.data();
        firstnameRef.current.value = documentData.first_name;
        lastnameRef.current.value = documentData.last_name;
        educationRef.current.value =
          documentData.education === undefined ? "" : documentData.education;
        workplaceRef.current.value =
          documentData.workplace === undefined ? "" : documentData.workplace;
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  const profileInfo = [
    {
      id: "firstname",
      label: "First Name",
      ref: firstnameRef,
      type: "text",
    },
    {
      id: "lastname",
      label: "Last Name",
      ref: lastnameRef,
      type: "text",
    },
    {
      id: "password",
      label: "Password",
      ref: passwordRef,
      type: "password",
    },
    {
      id: "education",
      label: "Education",
      ref: educationRef,
      type: "text",
    },
    {
      id: "workplace",
      label: "Workplace",
      ref: workplaceRef,
      type: "text",
    },
  ];

  const registerInfoInputs = profileInfo.map((info, index) => {
    return (
      <Form.Group id={info.id}>
        <Form.Label>{info.label}</Form.Label>
        <Form.Control
          id={info.id}
          ref={info.ref}
          type={info.type}
          defaultValue={info.defaultValue}
          placeholder={
            info.id === "password" ? "Leave blank to keep the same" : ""
          }
          style={{ width: "260px" }}
        ></Form.Control>
      </Form.Group>
    );
  });

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const promises = [];

    if (
      passwordRef.current.value !== "" &&
      passwordRef.current.value !== currentUser.pasword
    ) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    promises.push(
      docRef.update({
        first_name: firstnameRef.current.value,
        last_name: lastnameRef.current.value,
        education: educationRef.current.value,
        workplace: workplaceRef.current.value,
      })
    );

    Promise.all(promises)
      .then(() => {})
      .catch(() => {
        setError("Failed to update profile");
      })
      .finally(() => {
        history.push("/myprofile");
      });
  }

  return (
    <>
      <div className="editprofileContainer">
        <div className="editprofileLeft">
          <div className="myProfileText">Edit Your Profile</div>
        </div>
        <div className="editprofileRight">
          <Form onSubmit={handleSubmit}>
            {registerInfoInputs}
            <Button
              id="submitbutton"
              disabled={loading}
              type="submit"
              className="saveChangesButton"
            >
              Save Changes
            </Button>
          </Form>
          <Link to="/myprofile">Cancel</Link>
          {error && (
            <Alert variant="danger" className="editprofileAlert">
              {error}
            </Alert>
          )}
        </div>
      </div>
    </>
  );
}
