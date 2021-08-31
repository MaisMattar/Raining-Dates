/**
 * @format
 */

import { Button, Form, Alert } from "react-bootstrap";
import { FunctionComponent, useRef, useState } from "react";
import { useAuth } from "../../components/contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import firebase, { storage } from "../../firebase";
import styled from "@emotion/styled";

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

  const CenteredText = styled.div`
    textalign: "center";
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

  function parseDate(date_of_birth: string) {
    const b = date_of_birth.split(/\D/);
    let month = parseInt(b[1]);
    return new Date(parseInt(b[0]), --month, parseInt(b[2]));
  }

  const checkIfLegalAge = () => {
    const date_of_birth = parseDate(dateRef!.current!.value);
    const legalDate = new Date();
    legalDate.setFullYear(legalDate.getFullYear() - 20);
    if (date_of_birth < legalDate) {
      console.log("inside if");
      return true;
    }
    return false;
  };

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
            <CenteredText>
              Already have an account? <Link to="/login">Log In</Link>
            </CenteredText>
          </Box>
        </Part>
      </Wrapper>
    </Container>
  );
};
