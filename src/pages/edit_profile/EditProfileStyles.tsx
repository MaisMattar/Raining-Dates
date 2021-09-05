/** @format */

import { css } from "@emotion/react";

const container = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

const left = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 2;
`;

const right = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 3;
  margin-top: 30px;
  margin-bottom: 30px;
  flex-direction: column;
`;

const mainText = css`
  text-align: center;
  margin-top: 30px;
  font-size: 30px;
  color: rgb(62, 121, 170);
  font-weight: bold;
`;

const saveButton = css`
  height: 45px;
  width: 100%;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 15px;
`;

const editAlert = css`
  width: 280px;
  text-align: center;
  font-size: 18px;
  margin-top: 10px;
`;

export const editProfileStyles = {
  container,
  left,
  right,
  mainText,
  saveButton,
  editAlert,
};
