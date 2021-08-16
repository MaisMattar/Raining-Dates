/** @format */

import Topbar from "../../components/topbar/Topbar";
import "./agegroup.css";

export default function AgeGroup(props) {
  const pictures = props.peoplePictures.map((picture, index) => {
    return (
      <li key={index} className="peoplePictureListItem">
        <img src={picture} alt={index} className="peoplePicture"></img>
      </li>
    );
  });
  return (
    <div>
      <Topbar />
      <div className="ageGroupText">{props.ageGroup}</div>
      <ul className="peoplePictureList">{pictures}</ul>
    </div>
  );
}
