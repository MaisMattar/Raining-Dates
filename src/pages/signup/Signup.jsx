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
  const [imageUrl, setImageUrl] = useState("");
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

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUploadImage = (e) => {
    setLoading(true);
    const uploadImage = storage.ref(`images/${image.name}`).put(image);
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setImageUrl(url);
            console.log("imageUrl: ", imageUrl);
            setLoading(false);
          });
      }
    );
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (e) {
      setError("Failed to create an account. " + e.message);
      setLoading(false);
      return;
    }
    firebase
      .firestore()
      .collection("users")
      .doc(emailRef.current.value)
      .set({
        first_name: firstnameRef.current.value,
        last_name: lastnameRef.current.value,
        date_of_birth: dateRef.current.value,
        email: emailRef.current.value,
        images: [imageUrl],
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
              <input type="file" onChange={handleChange} />
              <Button onClick={handleUploadImage}>Upload Image</Button>
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
