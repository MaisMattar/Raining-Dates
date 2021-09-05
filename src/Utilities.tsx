/** @format */

import { MutableRefObject } from "react";

export interface formField {
  id: string;
  label: string;
  type: string;
  ref: MutableRefObject<HTMLInputElement | null>;
}

export const dateToString = (date: Date) => {
  const day = date.getDate();
  const dayString = day < 10 ? "0" + day : day;
  const month = date.getMonth() + 1;
  const monthString = month < 10 ? "0" + month : month;

  const year = date.getFullYear();

  return dayString + "/" + monthString + "/" + year;
};
