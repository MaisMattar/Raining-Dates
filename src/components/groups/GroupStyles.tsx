/** @format */

import { css } from "@emotion/react";

const listItem = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 180px;
  background-color: rgb(91, 151, 200);
  cursor: pointer;
  border-radius: 1em;
  -webkit-box-shadow: 4px 3px 6px 2px rgba(0, 0, 0, 0.76);
  box-shadow: 4px 3px 6px 2px rgba(0, 0, 0, 0.76);
`;

const list = css`
  list-style: none;
  display: grid;
  margin: 30px auto 30px auto;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 2em;
  max-width: 960px;
`;

const groupLink = css`
  text-decoration: none;
  width: 250px;
`;

const text = css`
  font-size: 40px;
  color: white;
`;

export const groupStyles = {
  listItem,
  list,
  groupLink,
  text,
};
