/** @format */

/** @jsxRuntime classic */
/** @jsx jsx */

import { useState, useEffect } from "react";
import { FunctionComponent } from "react";
import { css, jsx } from "@emotion/react";
import { getProfileInfo, userInfo } from "../../FirebaseUtil";
import { ProfileInfoType, ProfileInfoProps } from "../../Utilities";

const profileInfoStyle = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
`;

const text = css`
  font-size: 23px;
  margin-bottom: 10px;
`;

export const ProfileInfo: FunctionComponent<ProfileInfoProps> = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [education, setEducation] = useState("");
  const [workplace, setWorkplace] = useState("");

  const getUserInfo = async () => {
    const userInfoData: userInfo = await getProfileInfo(props.email);
    setFirstName(userInfoData.firstName);
    setLastName(userInfoData.lastName);
    setDate(userInfoData.dateOfBirth);
    setEducation(userInfoData.education);
    setWorkplace(userInfoData.workplace);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const profileInfo: Array<ProfileInfoType> = [
    { id: "firstname", label: "First Name", value: firstName },
    { id: "lastname", label: "Last Name", value: lastName },
    { id: "dateofbirth", label: "Date of Birth", value: date },
    { id: "education", label: "Education", value: education },
    { id: "workplace", label: "Workplace", value: workplace },
  ];

  const information = profileInfo.map((info, index) => {
    return (
      <div css={text} key={info.id}>
        {info.label}: {info.value}
      </div>
    );
  });

  return <div css={profileInfoStyle}>{information}</div>;
};
