/**
 * @format
 */

import { Button, Form, Alert } from "react-bootstrap";
import { useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../components/contexts/AuthContext";
import styled from "@emotion/styled";
import { FunctionComponent } from "react";

export const Login: FunctionComponent = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
    height: 70%;
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
    height: 300px;
    width: 370px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.664);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 17px;
  `;

  const LoginButton = styled(Button)`
    height: 45px;
    width: 100%;
    border-radius: 10px;
    margin-top: 15px;
  `;

  const LoginAlert = styled(Alert)`
    width: 370px;
    text-align: center;
    font-size: 18px;
  `;

  const CenteredText = styled.div`
    textalign: "center";
  `;

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
    <Container>
      <Wrapper>
        <Part>
          <Logo>Raining Dates</Logo>
          <Description>Find your next date</Description>
        </Part>
        <Part>
          {error && <LoginAlert variant="danger">{error}</LoginAlert>}
          <Box>
            <Form onSubmit={handleSubmit}>
              {loginInfoInputs}
              <LoginButton disabled={loading} type="submit">
                Log In
              </LoginButton>
            </Form>
            <CenteredText>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </CenteredText>
          </Box>
        </Part>
      </Wrapper>
    </Container>
  );
};
