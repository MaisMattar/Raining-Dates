/** @format */

import "./signup.css";
import { Button, Form, Alert } from "react-bootstrap";
import { useRef, useState } from "react";
import { useAuth } from "../../components/contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import firebase, { storage } from "../../firebase";

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
    <div className="signup">
      <div className="signupWrapper">
        <div className="signupLeft">
          <h3 className="signupLogo">Raining Dates</h3>
          <span className="signupDesc">Find your next date</span>
        </div>
        <div className="signupRight">
          {error && (
            <Alert variant="danger" className="signupAlert">
              {error}
            </Alert>
          )}
          <div className="signupBox">
            <Form onSubmit={handleSubmit}>
              {registerInfoInputs}
              <div>
                <label htmlFor="single">
                  <div className="uploadImageButton">
                    <div className="uploadImageText">Upload Image</div>
                  </div>
                </label>
                <input type="file" id="single" onChange={handleChange} />
              </div>
              <Button disabled={loading} type="submit" className="signupButton">
                Sign Up
              </Button>
            </Form>
            <div className="loginText">
              Already have an account? <Link to="/login">Log In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
