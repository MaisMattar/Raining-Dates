/** @format */

import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../components/contexts/AuthContext";
import firebase from "../../firebase";
import styled from "@emotion/styled";

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

  const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
  `;

  const Left = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 2;
  `;

  const MainText = styled.div`
    text-align: center;
    margin-top: 30px;
    font-size: 30px;
    color: rgb(62, 121, 170);
    font-weight: bold;
  `;

  const Right = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 3;
    margin-top: 30px;
    margin-bottom: 30px;
    flex-direction: column;
  `;

  const SaveButton = styled(Button)`
    height: 45px;
    width: 100%;
    border-radius: 10px;
    margin-top: 20px;
    margin-bottom: 15px;
  `;

  const EditAlert = styled(Alert)`
    width: 280px;
    text-align: center;
    font-size: 18px;
    margin-top: 10px;
  `;

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
      <Container>
        <Left>
          <MainText>Edit Your Profile</MainText>
        </Left>
        <Right>
          <Form onSubmit={handleSubmit}>
            {registerInfoInputs}
            <SaveButton id="submitbutton" disabled={loading} type="submit">
              Save Changes
            </SaveButton>
          </Form>
          <Link to="/myprofile">Cancel</Link>
          {error && <EditAlert variant="danger">{error}</EditAlert>}
        </Right>
      </Container>
    </>
  );
}
