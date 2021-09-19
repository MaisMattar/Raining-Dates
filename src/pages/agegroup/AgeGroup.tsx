/**
 * @format
 */

/** @jsxRuntime classic */
/** @jsx jsx */

import { Link } from "react-router-dom";
import { useState, useEffect, FunctionComponent } from "react";
import { useAuth } from "../../components/contexts/authContext";
import { jsx } from "@emotion/react";
import { ageGroupStyles } from "./ageGroupStyles";
import { getDateInTimestamp } from "../../Utilities";
import { getAgeGroupProfiles, ageGroupProfile } from "../../FirebaseUtil";

interface Group {
  text: string;
  startAge: number;
  endAge: number;
}

interface AgeGroupProps {
  ageGroup: Group;
}

export const AgeGroup: FunctionComponent<AgeGroupProps> = (props) => {
  const [peopleProfiles, setPeopleProfiles] = useState<Array<ageGroupProfile>>(
    []
  );

  const { currentUser } = useAuth();
  const { text, peopleList, peoplePicture, listItem } = ageGroupStyles;

  const setAgeGroupProfiles = async () => {
    const people = await getAgeGroupProfiles(
      getDateInTimestamp(props.ageGroup.startAge),
      getDateInTimestamp(props.ageGroup.endAge)
    );
    setPeopleProfiles(people);
  };

  useEffect(() => {
    setAgeGroupProfiles();
  }, []);

  const pictures = peopleProfiles.map((personProfile, index) => {
    if (personProfile.email !== currentUser.email) {
      return (
        <li css={listItem} key={personProfile.email}>
          <Link to={"/profile/" + personProfile.email}>
            <img css={peoplePicture} src={personProfile.image}></img>
          </Link>
        </li>
      );
    }
  });

  return (
    <div>
      <div css={text}>{props.ageGroup.text}</div>
      <ul css={peopleList}>{pictures}</ul>
    </div>
  );
};
