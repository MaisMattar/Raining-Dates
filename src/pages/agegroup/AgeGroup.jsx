/** @format */

import Topbar from "../../components/topbar/Topbar";
import "./agegroup.css";
import { Link } from "react-router-dom";

export default function AgeGroup(props) {
  const pictures = props.peoplePictures.map((picture, index) => {
    return (
      <Link className="ageGroupLink" to="/profile">
        <li key={index} className="peoplePictureListItem">
          <img src={picture} alt={index} className="peoplePicture"></img>
        </li>
      </Link>
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
