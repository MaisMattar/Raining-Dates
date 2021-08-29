/**
 * @format
 * @jsxImportSource @emotion/react
 */

import "./signup.css";
import { Button, Form, Alert } from "react-bootstrap";
import { useRef, useState } from "react";
import { useAuth } from "../../components/contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import firebase, { storage } from "../../firebase";
import styled from "@emotion/styled";

export default function Signup() {
  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const dateRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const history = useHistory();

  const Container = styled.div`
    position: absolute;
    top: auto;
    width: 100%;
    height: 100%;
    background-image: url("https://www.juneauempire.com/wp-content/uploads/2018/11/6044053_web1_rodion-kutsaev-760882-unsplash.jpg");
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  `;

  const Wrapper = styled.div`
    width: 70%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  `;

  const Part = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const Logo = styled.h3`
    font-size: 50px;
    font-weight: 800;
    color: white;
    margin-bottom: 10px;
    text-shadow: 2px 2px black;
  `;

  const Description = styled.span`
    font-size: 24px;
    color: white;
    font-weight: bold;
    text-shadow: 2px 2px black;
  `;

  const Box = styled.div`
    height: 500px;
    width: 370px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.664);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 17px;
  `;

  const SignUpButton = styled(Button)`
    height: 45px;
    width: 100%;
    border-radius: 10px;
    margin-top: 15px;
  `;

  const SignUpAlert = styled(Alert)`
    width: 370px;
    text-align: center;
    font-size: 18px;
  `;

  const UploadButton = styled.div`
    height: 35px;
    width: 150px;
    background-color: royalblue;
    border-radius: 3px;
    margin-top: 10px;
    cursor: pointer;
  `;

  const UploadText = styled.div`
    font-size: 17px;
    text-align: center;
    color: white;
    padding: 5px 0;
  `;

  const registerInfo = [
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
        <Form.Control ref={info.ref} required type={info.type}></Form.Control>
      </Form.Group>
    );
  });

  function parseDate(date_of_birth) {
    var b = date_of_birth.split(/\D/);
    return new Date(b[0], --b[1], b[2]);
  }

  const checkIfLegalAge = () => {
    const date_of_birth = parseDate(dateRef.current.value);
    const legalDate = new Date();
    legalDate.setFullYear(legalDate.getFullYear() - 20);
    console.log("date_of_birth = ", date_of_birth);
    console.log("legalDate = ", legalDate);
    if (date_of_birth < legalDate) {
      console.log("inside if");
      return true;
    }
    return false;
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    setLoading(false);
  };

  const createProfileFirebaseDoc = () => {
    setError("");
    const docRef = firebase
      .firestore()
      .collection("users")
      .doc(emailRef.current.value);

    const imageName = emailRef.current.value + image.name;

    const uploadImage = storage.ref(`images/${imageName}`).put(image);
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
                first_name: firstnameRef.current.value,
                last_name: lastnameRef.current.value,
                date_of_birth: parseDate(dateRef.current.value),
                email: emailRef.current.value,
                images: [url],
                education: "",
                workplace: "",
              })
              .then(() => {
                console.log("Document added succesfully!");
                history.push("/");
              })
              .catch((e) => {
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
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (e) {
      setError("Failed to create an account. " + e.message);
      setLoading(false);
      return;
    }
  };

  const createInterestsFirebaseDoc = (collectionName) => {
    firebase
      .firestore()
      .collection(collectionName)
      .doc(emailRef.current.value)
      .set({
        profiles: [],
      });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!checkIfLegalAge()) {
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
    <Container>
      <Wrapper>
        <Part>
          <Logo>Raining Dates</Logo>
          <Description>Find your next date</Description>
        </Part>
        <Part>
          {error && <SignUpAlert variant="danger">{error}</SignUpAlert>}
          <Box>
            <Form onSubmit={handleSubmit}>
              {registerInfoInputs}
              <div>
                <label htmlFor="single">
                  <UploadButton>
                    <UploadText>Upload Image</UploadText>
                  </UploadButton>
                </label>
                <input type="file" id="single" onChange={handleChange} />
              </div>
              <SignUpButton disabled={loading} type="submit">
                Sign Up
              </SignUpButton>
            </Form>
            <div css={{ textAlign: "center" }}>
              Already have an account? <Link to="/login">Log In</Link>
            </div>
          </Box>
        </Part>
      </Wrapper>
    </Container>
  );
}
