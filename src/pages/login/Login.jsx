/** @format */

import "./login.css";
import { Button, Form, Alert } from "react-bootstrap";
import { useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../components/contexts/AuthContext";

export default function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { currentUser, login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const loginInfo = [
    { id: "email", label: "Email", type: "email", ref: emailRef },
    { id: "password", label: "Password", type: "password", ref: passwordRef },
  ];

  const loginInfoInputs = loginInfo.map((info, index) => {
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
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Raining Dates</h3>
          <span className="loginDesc">Find your next date</span>
        </div>
        <div className="loginRight">
          {error && (
            <Alert variant="danger" className="loginAlert">
              {error}
            </Alert>
          )}
          <div className="loginBox">
            <Form onSubmit={handleSubmit}>
              {loginInfoInputs}
              <Button disabled={loading} type="submit" className="loginButton">
                Log In
              </Button>
            </Form>
            <div className="signupText">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
