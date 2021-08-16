/** @format */

import Groups from "../../components/groups/Groups";
import Topbar from "../../components/topbar/Topbar";
import "./home.css";

const ageGroups = ["20-30", "30-40", "40-50", "50-60", "60-70", "70-80"];

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainerText">Pick your preferred age group</div>
      <div className="homeContainer">
        <Groups ageGroups={ageGroups} />
      </div>
    </>
  );
}
