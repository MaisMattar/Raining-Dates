/** @format */

import "./signup.css";
import { Button, Form, Alert } from "react-bootstrap";
import { useRef, useState } from "react";
import { useAuth } from "../../components/contexts/AuthContext";

export default function Signup() {
  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const dateRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const registerInfo = [
    { id: "firstname", label: "First Name", type: "text", ref: firstnameRef },
    { id: "lastname", label: "Last Name", type: "text", ref: lastnameRef },
    { id: "date", label: "Date of Birth", type: "text", ref: dateRef },
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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <div className="signup">
      <div className="signupWrapper">
        <div className="signupLeft">
          <h3 className="signupLogo">Raining Dates</h3>
          <span className="signupDesc">Find your next date</span>
        </div>
        <div className="signupRight">
          <div className="signupBox">
            {error && <Alert variant="danger">{error}</Alert>}
            <Form className="signupForm" onSubmit={handleSubmit}>
              {registerInfoInputs}
              <Button disabled={loading} type="submit" className="signupButton">
                Sign Up
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}