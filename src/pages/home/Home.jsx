/** @format */

import Groups from "../../components/groups/Groups";
import "./home.css";
import styled from "@emotion/styled";

export default function Home(props) {
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
