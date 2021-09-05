/** @format */

import { css } from "@emotion/react";

const container = css`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  flex-wrap: wrap;
`;
const mainText = css`
  text-align: center;
  margin-top: 30px;
  font-size: 30px;
  color: rgb(62, 121, 170);
  font-weight: bold;
`;
const right = css`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const editButton = css`
  height: 45px;
  width: 150px;
  border-radius: 10px;
  margin-top: 15px;
`;

export const myProfileStyles = {
  container,
  mainText,
  right,
  editButton,
};
