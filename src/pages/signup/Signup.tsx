/**
 * @format
 */

/** @jsxRuntime classic */
/** @jsx jsx */

import { Button, Form, Alert } from "react-bootstrap";
import { FunctionComponent, useRef, useState, useEffect } from "react";
import { useAuth } from "../../components/contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import firebase, { storage } from "../../firebase";
import { css, jsx } from "@emotion/react";
import { signupStyles } from "./SignupStyles";
import { formField, parseDate, checkIfLegalAge } from "../../Utilities";
import { handleSignup, userInfo, createProfile } from "../../firebase_util";

export const Signup: FunctionComponent = () => {
  const firstnameRef = useRef<HTMLInputElement | null>(null);
  const lastnameRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const history = useHistory();
  const {
    container,
    wrapper,
    part,
    logo,
    description,
    box,
    signupButton,
    signupAlert,
    uploadText,
    uploadButton,
  } = signupStyles;

  const registerInfo: Array<formField> = [
    { id: "firstname", label: "First Name", type: "text", ref: firstnameRef },
    { id: "lastname", label: "Last Name", type: "text", ref: lastnameRef },
    { id: "date", label: "Date of Birth", type: "date", ref: dateRef },
    { id: "email", label: "Email", type: "email", ref: emailRef },
    { id: "password", label: "Password", type: "password", ref: passwordRef },
  ];

  const registerInfoInputs = registerInfo.map((info, index) => {
    return (
      <Form.Group id={info.id}>
        <Form.Label>{info.label}</Form.Label>
        <Form.Control
          ref={info.ref}
          required
          type={info.type}
          defaultValue={
            info.ref && info.ref.current ? info.ref!.current!.value : ""
          }
        ></Form.Control>
      </Form.Group>
    );
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null || e.target.files[0] === null) {
      return;
    }
    setImage(e.target.files[0]);
    setLoading(false);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!checkIfLegalAge(dateRef!.current!.value)) {
      setError("Failed to create an account. You must be 20 or older!");
      return;
    }

    const userInfo: userInfo = {
      firstName: firstnameRef!.current!.value,
      lastName: lastnameRef!.current!.value,
      dateOfBirth: dateRef!.current!.value,
      education: "",
      workplace: "",
      email: emailRef!.current!.value,
    };

    setError("");

    const createProfRes = await createProfile(userInfo, image!);
    if (!createProfRes) {
      setError("Failed to create account!");
      return;
    }

    const signupRes = await handleSignup(
      emailRef!.current!.value,
      passwordRef!.current!.value,
      signup!
    );
    if (!signupRes) {
      setError("Failed to create account!");
      return;
    }

    history.push("/");
  }

  return (
    <div css={container}>
      <div css={wrapper}>
        <div css={part}>
          <h3 css={logo}>Raining Dates</h3>
          <span css={description}>Find your next date</span>
        </div>
        <div css={part}>
          {error && (
            <Alert css={signupAlert} variant="danger">
              {error}
            </Alert>
          )}
          <div css={box}>
            <Form onSubmit={handleSubmit}>
              {registerInfoInputs}
              <div>
                <label htmlFor="single">
                  <div css={uploadButton}>
                    <div css={uploadText}>Upload Image</div>
                  </div>
                </label>
                <input type="file" id="single" onChange={handleChange} />
              </div>
              <Button css={signupButton} disabled={loading} type="submit">
                Sign Up
              </Button>
            </Form>
            <div
              css={css`
                text-align: center;
              `}
            >
              Already have an account? <Link to="/login">Log In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
