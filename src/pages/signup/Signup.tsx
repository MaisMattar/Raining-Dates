/**
 * @format
 */

/** @jsxRuntime classic */
/** @jsx jsx */

import { Button, Form, Alert } from "react-bootstrap";
import { FunctionComponent, useRef, useState } from "react";
import { useAuth } from "../../components/contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import firebase, { storage } from "../../firebase";
import { css, jsx } from "@emotion/react";
import { signupStyles } from "./SignupStyles";
import { formField, parseDate, checkIfLegalAge } from "../../Utilities";

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

  const createProfileFirebaseDoc = () => {
    setError("");
    const docRef = firebase
      .firestore()
      .collection("users")
      .doc(emailRef!.current!.value);

    const imageName = emailRef!.current!.value + image!.name;

    const uploadImage = storage.ref(`images/${imageName}`).put(image!);
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(imageName)
          .getDownloadURL()
          .then((url) => {
            docRef
              .set({
                first_name: firstnameRef!.current!.value,
                last_name: lastnameRef!.current!.value,
                date_of_birth: parseDate(dateRef!.current!.value),
                email: emailRef!.current!.value,
                images: [url],
                education: "",
                workplace: "",
              })
              .then(() => {
                console.log("Document added succesfully!");
                history.push("/");
              })
              .catch((e: any) => {
                setError("Failed to create an account " + e);
              });
            setLoading(false);
          });
      }
    );
  };

  const handleEmailPasswordSignUp = async () => {
    try {
      setError("");
      setLoading(true);
      await signup(emailRef!.current!.value, passwordRef!.current!.value);
    } catch (e: any) {
      setError("Failed to create an account. " + e.message);
      setLoading(false);
      return;
    }
  };

  const createInterestsFirebaseDoc = (collectionName: string) => {
    firebase
      .firestore()
      .collection(collectionName)
      .doc(emailRef!.current!.value)
      .set({
        profiles: [],
      });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!checkIfLegalAge(dateRef!.current!.value)) {
      setError("Failed to create an account. You must be 20 or older!");
      return;
    }

    createProfileFirebaseDoc();
    if (error !== "") return;

    handleEmailPasswordSignUp();
    if (error !== "") return;

    createInterestsFirebaseDoc("interested");
    createInterestsFirebaseDoc("notInterested");
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
