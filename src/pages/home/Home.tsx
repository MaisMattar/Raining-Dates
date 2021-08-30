/** @format */

import Groups from "../../components/groups/Groups";
import styled from "@emotion/styled";

interface Group {
  text: string;
  startAge: number;
  endAge: number;
}

interface IProps {
  ageGroups: Array<Group>;
}

export default function Home(props: IProps) {
  const HomeText = styled.div`
    text-align: center;
    margin-top: 30px;
    color: rgb(62, 121, 170);
    font-size: 30px;
  `;

  return (
    <>
      <HomeText>Pick your preferred age group</HomeText>
      <div>
        <Groups ageGroups={props.ageGroups} />
      </div>
    </>
  );
}
