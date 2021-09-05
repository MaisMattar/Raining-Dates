/** @format */

/** @jsxRuntime classic */
/** @jsx jsx */

import React, { FunctionComponent, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../components/contexts/AuthContext";
import firebase from "../../firebase";
import { jsx } from "@emotion/react";
import { editProfileStyles } from "./EditProfileStyles";
import { formField } from "../../Utilities";

export const EditProfile: FunctionComponent = () => {
  const firstnameRef = useRef<HTMLInputElement | null>(null);
  const lastnameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const educationRef = useRef<HTMLInputElement | null>(null);
  const workplaceRef = useRef<HTMLInputElement | null>(null);
  const history = useHistory();
  const { currentUser, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { container, left, right, mainText, saveButton, editAlert } =
    editProfileStyles;

  const profileInfo: Array<formField> = [
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
        firstnameRef!.current!.value = documentData!.first_name;
        lastnameRef!.current!.value = documentData!.last_name;
        educationRef!.current!.value =
          documentData!.education === undefined ? "" : documentData!.education;
        workplaceRef!.current!.value =
          documentData!.workplace === undefined ? "" : documentData!.workplace;
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
          placeholder={
            info.id === "password" ? "Leave blank to keep the same" : ""
          }
          style={{ width: "260px" }}
        ></Form.Control>
      </Form.Group>
    );
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const promises = [];

    if (
      passwordRef!.current!.value !== "" &&
      passwordRef!.current!.value !== currentUser.pasword
    ) {
      promises.push(updatePassword(passwordRef!.current!.value));
    }

    promises.push(
      docRef.update({
        first_name: firstnameRef!.current!.value,
        last_name: lastnameRef!.current!.value,
        education: educationRef!.current!.value,
        workplace: workplaceRef!.current!.value,
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
    <div css={container}>
      <div css={left}>
        <div css={mainText}>Edit Your Profile</div>
      </div>
      <div css={right}>
        <Form onSubmit={handleSubmit}>
          {registerInfoInputs}
          <Button
            css={saveButton}
            id="submitbutton"
            disabled={loading}
            type="submit"
          >
            Save Changes
          </Button>
        </Form>
        <Link to="/myprofile">Cancel</Link>
        {error && (
          <Alert css={editAlert} variant="danger">
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
};
