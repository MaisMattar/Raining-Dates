/** @format */

import { css } from "@emotion/react";

const text = css`
  margin-top: 30px;
  font-size: 50px;
  margin-left: 50px;
  color: rgb(62, 121, 170);
  font-weight: bold;
`;

const peopleList = css`
  list-style: none;
  justify-content: space-around;
  display: grid;
  margin: 30px auto 30px;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  grid-gap: 1em;
`;

const peoplePicture = css`
  width: 170px;
  height: 170px;
  border-radius: 10px;
  -webkit-box-shadow: 4px 3px 6px 2px rgba(0, 0, 0, 0.76);
  box-shadow: 4px 3px 6px 2px rgba(0, 0, 0, 0.76);
  cursor: pointer;
  object-fit: cover;
`;

const listItem = css`
  position: relative;
  margin-top: 30px;
`;

export const ageGroupStyles = {
  text,
  peopleList,
  peoplePicture,
  listItem,
};
