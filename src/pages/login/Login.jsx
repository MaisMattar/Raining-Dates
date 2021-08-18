/** @format */

import "./login.css";
import { Button, Form } from "react-bootstrap";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

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

  const doLogIn = () => {
    console.log("login");
  };

  const doSignUp = () => {
    console.log("signup");
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Raining Dates</h3>
          <span className="loginDesc">Find your next date</span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <Form className="signupForm">{loginInfoInputs}</Form>
            <Button type="submit" className="loginButton" onClick={doLogIn}>
              Log In
            </Button>
            <div className="signUpText">Don't have an account?</div>
            <div className="signUpText">
              <Link to="/signup"> Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
