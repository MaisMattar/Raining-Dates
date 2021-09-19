/** @format */

/** @jsxRuntime classic */
/** @jsx jsx */

import React, { FunctionComponent, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useRef, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../components/contexts/authContext";
import { jsx } from "@emotion/react";
import { editProfileStyles } from "./editProfileStyles";
import { formField } from "../../Utilities";
import {
  getProfileInfo,
  updateUser,
  updateUserPassword,
} from "../../FirebaseUtil";

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

  const initFormFields = async () => {
    const profileInfo = await getProfileInfo(currentUser.email);
    firstnameRef!.current!.value = profileInfo!.firstName;
    lastnameRef!.current!.value = profileInfo!.lastName;
    educationRef!.current!.value =
      profileInfo!.education === undefined ? "" : profileInfo!.education;
    workplaceRef!.current!.value =
      profileInfo!.workplace === undefined ? "" : profileInfo!.workplace;
  };

  useEffect(() => {
    initFormFields();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await updateUserPassword(
      passwordRef!.current!.value,
      currentUser.pasword,
      updatePassword!
    );

    await updateUser(currentUser.email, {
      first_name: firstnameRef!.current!.value,
      last_name: lastnameRef!.current!.value,
      education: educationRef!.current!.value,
      workplace: workplaceRef!.current!.value,
    });

    history.push("/myprofile");
  };

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
