/** @format */

import { css } from "@emotion/react";

const container = css`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  flex-wrap: wrap;
  margin-left: 30px;
`;

const text = css`
  text-align: center;
  margin-top: 30px;
  font-size: 30px;
  color: rgb(62, 121, 170);
  font-weight: bold;
`;

const buttonsContainer = css`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const iconButton = css`
  margin-right: 20px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: white;
`;

const part = css`
  flex: 1;
`;

export const profileStyles = {
  container,
  text,
  buttonsContainer,
  iconButton,
  part,
};
