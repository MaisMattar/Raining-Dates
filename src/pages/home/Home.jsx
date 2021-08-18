/** @format */

import Groups from "../../components/groups/Groups";
import Topbar from "../../components/topbar/Topbar";
import "./home.css";

export default function Home(props) {
  return (
    <>
      <Topbar />
      <div className="homeContainerText">Pick your preferred age group</div>
      <div className="homeContainer">
        <Groups ageGroups={props.ageGroups} />
      </div>
    </>
  );
}
