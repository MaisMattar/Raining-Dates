/** @format */

/** @jsxRuntime classic */
/** @jsx jsx */

import { Button, Form, Alert } from "react-bootstrap";
import { useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../components/contexts/AuthContext";
import { FunctionComponent } from "react";
import { css, jsx } from "@emotion/react";
import { loginStyles } from "./LoginStyles";
import { performLogin } from "../../firebase_util";
import { formField } from "../../Utilities";

export const Login: FunctionComponent = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const {
    container,
    wrapper,
    part,
    logo,
    description,
    box,
    loginButton,
    loginAlert,
  } = loginStyles;

  const loginInfo: Array<formField> = [
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    let loginResult = false;

    loginResult = await performLogin(
      emailRef!.current!.value,
      passwordRef!.current!.value,
      login!
    );

    if (loginResult) {
      history.push("/");
    } else {
      setError("Failed to log in");
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div css={container}>
      <div css={wrapper}>
        <div css={part}>
          <h3 css={logo}>Raining Dates</h3>
          <span css={description}>Find your next date</span>
        </div>
        <div css={part}>
          {error && (
            <Alert css={loginAlert} variant="danger">
              {error}
            </Alert>
          )}
          <div css={box}>
            <Form onSubmit={handleSubmit}>
              {loginInfoInputs}
              <Button css={loginButton} disabled={loading} type="submit">
                Log In
              </Button>
            </Form>
            <div
              css={css`
                text-align: center;
              `}
            >
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
