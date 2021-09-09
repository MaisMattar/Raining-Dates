/** @format */
/** @jsxRuntime classic */
/** @jsx jsx */
import { useState, useEffect, useReducer } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FunctionComponent } from "react";
import { css, jsx } from "@emotion/react";
import { getProfileInfo, userInfo } from "../../firebase_util";
import { ProfileInfoType } from "../../Utilities";

const profileText = css`
  font-size: 23px;
  margin-bottom: 10px;
`;
const profileInfoStyle = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
`;

const initialState = {
  firstName: "",
  lastName: "",
  date: "",
  education: "",
  workplace: "",
};

export const MyProfileInfo: FunctionComponent = () => {
  const { currentUser } = useAuth();
  const [myProfileInfo, setMyProfileInfo] = useState(initialState);
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [date, setDate] = useState("");
  // const [education, setEducation] = useState("");
  // const [workplace, setWorkplace] = useState("");

  const profileInfo: Array<ProfileInfoType> = [
    { id: "firstname", label: "First Name", value: myProfileInfo.firstName },
    { id: "lastname", label: "Last Name", value: myProfileInfo.lastName },
    { id: "date", label: "Date of Birth", value: myProfileInfo.date },
    { id: "email", label: "Email", value: currentUser.email },
    { id: "education", label: "Education", value: myProfileInfo.education },
    { id: "workplace", label: "Workplace", value: myProfileInfo.workplace },
  ];

  const getUserInfo = async () => {
    console.log("yaaay");
    const userInfoData: userInfo = await getProfileInfo(currentUser.email);
    setMyProfileInfo({
      firstName: userInfoData.firstName,
      lastName: userInfoData.lastName,
      date: userInfoData.dateOfBirth,
      education: userInfoData.education,
      workplace: userInfoData.workplace,
    });
    // setFirstName(userInfoData.firstName);
    // setLastName(userInfoData.lastName);
    // setDate(userInfoData.dateOfBirth);
    // setEducation(userInfoData.education);
    // setWorkplace(userInfoData.workplace);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const information = profileInfo.map((info, index) => {
    return (
      <div css={profileText} id={info.id}>
        {info.label}: {info.value}
      </div>
    );
  });

  return (
    <div>
      <div css={profileInfoStyle}>{information}</div>
    </div>
  );
};
