/** @format */

import { css } from "@emotion/react";

const container = css`
  height: 70px;
  width: 100%;
  background-color: rgb(62, 121, 170);
  display: flex;
  align-items: center;
  position: sticky;
`;

const logo = css`
  font-size: 30px;
  margin-left: 20px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

const right = css`
  flex: 2;
  color: white;
`;

const icons = css`
  display: flex;
  justify-content: flex-end;
`;

const iconItem = css`
  margin-right: 15px;
  cursor: pointer;
`;

const left = css`
  flex: 5;
`;

const link = css`
  color: white;
`;

export const topbarStyles = {
  container,
  logo,
  right,
  icons,
  iconItem,
  left,
  link,
};
