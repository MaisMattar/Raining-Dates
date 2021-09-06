/** @format */

import { dateToString } from "./Utilities";
import firebase from "firebase";

export interface userInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  education: string;
  workplace: string;
}

const defaultUserInfo: userInfo = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  education: "",
  workplace: "",
};

export const getProfileInfo = async (email: string) => {
  try {
    const document = await firebase
      .firestore()
      .collection("users")
      .doc(email)
      .get();
    const documentData = document.data();
    const date = documentData!.date_of_birth.toDate();
    const userInfoData: userInfo = {
      firstName: documentData!.first_name,
      lastName: documentData!.last_name,
      dateOfBirth: dateToString(date),
      education: documentData!.education,
      workplace: documentData!.workplace,
    };
    return userInfoData;
  } catch (error) {
    console.log("Error getting document:", error);
  }
  return defaultUserInfo;
};
