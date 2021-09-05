/** @format */

import { MutableRefObject } from "react";
import firebase from "firebase";

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

export const getDateInTimestamp = (age: number) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - age);
  return firebase.firestore.Timestamp.fromDate(date);
};

export const parseDate = (date_of_birth: string) => {
  const b = date_of_birth.split(/\D/);
  let month = parseInt(b[1]);
  return new Date(parseInt(b[0]), --month, parseInt(b[2]));
};

export const checkIfLegalAge = (date: string) => {
  const date_of_birth = parseDate(date);
  const legalDate = new Date();
  legalDate.setFullYear(legalDate.getFullYear() - 20);
  if (date_of_birth < legalDate) {
    console.log("inside if");
    return true;
  }
  return false;
};
