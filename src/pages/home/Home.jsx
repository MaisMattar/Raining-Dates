/** @format */

import Groups from "../../components/groups/Groups";
import "./home.css";

export default function Home(props) {
  return (
    <>
      <div className="homeContainerText">Pick your preferred age group</div>
      <div className="homeContainer">
        <Groups ageGroups={props.ageGroups} />
      </div>
    </>
  );
}
