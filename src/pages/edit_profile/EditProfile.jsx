/** @format */

import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useRef } from "react";
import "./editprofile.css";
import Topbar from "../../components/topbar/Topbar";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../components/contexts/AuthContext";

export default function EditProfile() {
  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const dateRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const educationRef = useRef(null);
  const workplaceRef = useRef(null);
  const aboutRef = useRef(null);
  const history = useHistory();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const profileInfo = [
    {
      id: "firstname",
      label: "First Name",
      ref: firstnameRef,
      type: "text",
      defaultValue: "",
    },
    {
      id: "lastname",
      label: "Last Name",
      ref: lastnameRef,
      type: "text",
      defaultValue: "",
    },
    {
      id: "date",
      label: "Date of Birth",
      ref: dateRef,
      type: "date",
      defaultValue: "",
    },
    {
      id: "email",
      label: "Email",
      ref: emailRef,
      type: "email",
      defaultValue: currentUser.email,
    },
    {
      id: "password",
      label: "Password",
      ref: passwordRef,
      type: "password",
      defaultValue: "",
    },
    {
      id: "education",
      label: "Education",
      ref: educationRef,
      type: "text",
      defaultValue: "",
    },
    {
      id: "workplace",
      label: "Workplace",
      ref: workplaceRef,
      type: "text",
      defaultValue: "",
    },
    {
      id: "about",
      label: "Talk About Yourself",
      ref: aboutRef,
      type: "text",
      defaultValue: "",
    },
  ];

  const registerInfoInputs = profileInfo.map((info, index) => {
    return (
      <Form.Group>
        <Form.Label>{info.label}</Form.Label>
        <Form.Control
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

    if (emailRef.current.value !== currentUser.email) {
      console.log("updatingEmail");
      promises.push(updateEmail(emailRef.current.value));
    }

    if (
      passwordRef.current.value !== "" &&
      passwordRef.current.value !== currentUser.pasword
    ) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/myprofile");
      })
      .catch(() => {
        setError("Failed to update profile");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Topbar />
      <div className="editprofileContainer">
        <div className="editprofileLeft">
          <div className="myProfileText">Edit Your Profile</div>
        </div>
        <div className="editprofileRight">
          <Form onSubmit={handleSubmit}>
            {registerInfoInputs}
            <Button
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
