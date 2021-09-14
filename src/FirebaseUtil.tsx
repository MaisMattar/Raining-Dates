/** @format */

import { dateToString, parseDate } from "./Utilities";
import firebase, { storage } from "./firebase";

export interface userInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  education: string;
  workplace: string;
  email?: string;
  password?: string;
  image?: File;
}

export interface ageGroupProfile {
  email: string;
  image: string;
}

const defaultUserInfo: userInfo = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  education: "",
  workplace: "",
};

const getDocument = async (collection: string, doc: string) => {
  try {
    const document = await firebase
      .firestore()
      .collection(collection)
      .doc(doc)
      .get();
    return document;
  } catch (error) {
    console.log("Error getting document:", error);
    return null;
  }
};

const updateDocument = async (
  collection: string,
  doc: string,
  updates: any
) => {
  try {
    await firebase.firestore().collection(collection).doc(doc).update(updates);
  } catch (error) {
    console.log("Error updating document:", error);
  }
};

export const updateUserPassword = async (
  newPassword: string,
  oldPassword: string,
  updatePasswordFunc: (password: string) => any
) => {
  if (newPassword !== "" && newPassword !== oldPassword) {
    try {
      await updatePasswordFunc(newPassword);
    } catch (error) {
      console.log("Failed to update password ", error);
    }
  }
};

export const getProfileInfo = async (email: string) => {
  const document = await getDocument("users", email);

  if (document) {
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
  }

  return defaultUserInfo;
};

export const getProfilePictures = async (email: string) => {
  const document = await getDocument("users", email);
  if (document) {
    const documentData = document.data();
    return documentData!.images;
  }
  return [];
};

export const updateUser = async (email: string, updates: any) => {
  await updateDocument("users", email, updates);
};

export const uploadImageToStorage = async (
  imageName: string,
  imageFile: File
) => {
  try {
    const uploadImage = await storage.ref(`images/${imageName}`).put(imageFile);
    const url = await uploadImage.ref.getDownloadURL();
    return url;
  } catch (error) {
    console.log("Error uploading image ", error);
  }
  return "";
};

export const getAgeGroupProfiles = async (
  largerDate: firebase.firestore.Timestamp,
  smallerDate: firebase.firestore.Timestamp
) => {
  const people: Array<ageGroupProfile> = [];
  try {
    const querySnapshot = await firebase
      .firestore()
      .collection("users")
      .where("date_of_birth", "<", largerDate)
      .where("date_of_birth", ">=", smallerDate)
      .get();
    querySnapshot.forEach((doc) => {
      const documentData = doc.data();
      people.push({ email: documentData.email, image: documentData.images[0] });
    });
  } catch (error) {
    console.log("Error getting documents ", error);
  }

  return people;
};

export const performLogin = async (
  email: string,
  password: string,
  login: (email: string, password: string) => any
) => {
  try {
    await login(email, password);
    return true;
  } catch (error) {
    console.log("Failed to login");
  }
  return false;
};

const checkIfUserIncluded = async (
  myEmail: string,
  userEmail: string,
  collection: string
) => {
  const document = await getDocument(collection, myEmail);
  if (document) {
    const documentData = document.data();
    if (documentData && documentData.profiles.includes(userEmail)) return true;
  }
  return false;
};

export const checkIfNotInterested = async (
  myEmail: string,
  userEmail: string
) => {
  return checkIfUserIncluded(myEmail, userEmail, "notInterested");
};

export const checkIfInterested = async (myEmail: string, userEmail: string) => {
  return checkIfUserIncluded(myEmail, userEmail, "interested");
};

const addProfileToCollection = async (
  collectionToAdd: string,
  collectionToRemove: string,
  myEmail: string,
  userEmail: string
) => {
  await updateDocument(collectionToAdd, myEmail, {
    profiles: firebase.firestore.FieldValue.arrayUnion(userEmail),
  });
  await updateDocument(collectionToRemove, myEmail, {
    profiles: firebase.firestore.FieldValue.arrayRemove(userEmail),
  });
};

export const updateInterested = async (myEmail: string, userEmail: string) => {
  await addProfileToCollection(
    "interested",
    "notInterested",
    myEmail,
    userEmail
  );
};

export const updateNotInterested = async (
  myEmail: string,
  userEmail: string
) => {
  await addProfileToCollection(
    "notInterested",
    "interested",
    myEmail,
    userEmail
  );
};

const createInterestsFirebaseDoc = async (
  collectionName: string,
  email: string
) => {
  try {
    await firebase.firestore().collection(collectionName).doc(email).set({
      profiles: [],
    });
  } catch (error) {
    console.log("Failed to create document! ", error);
  }
};

export const createProfile = async (userInfo: userInfo, image: File) => {
  const docRef = firebase.firestore().collection("users").doc(userInfo.email);

  const imageUrl = await uploadImageToStorage(
    userInfo.email + image.name,
    image
  );
  if (imageUrl.length === 0) return false;

  try {
    await docRef.set({
      first_name: userInfo.firstName,
      last_name: userInfo.lastName,
      date_of_birth: parseDate(userInfo.dateOfBirth),
      email: userInfo.email,
      images: [imageUrl],
      education: "",
      workplace: "",
    });
  } catch (error) {
    return false;
  }

  await createInterestsFirebaseDoc("interested", userInfo.email!);
  await createInterestsFirebaseDoc("notInterested", userInfo.email!);

  return true;
};

export const handleSignup = async (
  email: string,
  password: string,
  signup: (email: string, password: string) => any
) => {
  try {
    await signup(email, password);
    return true;
  } catch (e: any) {
    return false;
  }
};
