/** @format */

import { css } from "@emotion/react";

const container = css`
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

const wrapper = css`
  width: 70%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const part = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const logo = css`
  font-size: 50px;
  font-weight: 800;
  color: white;
  margin-bottom: 10px;
  text-shadow: 2px 2px black;
`;

const description = css`
  font-size: 24px;
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px black;
`;

const box = css`
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

const signupButton = css`
  height: 45px;
  width: 100%;
  border-radius: 10px;
  margin-top: 15px;
`;

const signupAlert = css`
  width: 370px;
  text-align: center;
  font-size: 18px;
`;

const uploadText = css`
  font-size: 17px;
  text-align: center;
  color: white;
  padding: 5px 0;
`;

const uploadButton = css`
  height: 35px;
  width: 150px;
  background-color: royalblue;
  border-radius: 3px;
  margin-top: 10px;
  cursor: pointer;
`;

export const signupStyles = {
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
};
