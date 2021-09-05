/** @format */

import { css } from "@emotion/react";

const list = css`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  grid-gap: 1em;
`;

const pictureStyle = css`
  width: 170px;
  height: 170px;
  border-radius: 10px;
  -webkit-box-shadow: 4px 3px 6px 2px rgba(0, 0, 0, 0.76);
  box-shadow: 4px 3px 6px 2px rgba(0, 0, 0, 0.76);
  object-fit: cover;
`;

const addPicture = css`
  width: 170px;
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const deleteButton = css`
  position: relative;
  top: 16px;
  right: 10px;
  cursor: pointer;
`;

const removeAlert = css`
  margin-top: 40px;
  margin-left: 20px;
  width: 320px;
  text-align: center;
`;

const addPicImage = css`
  transform: scale(3);
  cursor: pointer;
`;

export const myProfPicStyles = {
  list,
  pictureStyle,
  addPicture,
  deleteButton,
  removeAlert,
  addPicImage,
};
