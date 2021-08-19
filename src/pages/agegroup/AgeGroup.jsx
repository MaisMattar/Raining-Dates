/** @format */

import Topbar from "../../components/topbar/Topbar";
import "./agegroup.css";
import { Link } from "react-router-dom";

export default function AgeGroup(props) {
  const peoplePictures = [
    "https://pbs.twimg.com/profile_images/658970219507904513/4eK6qnpt.jpg",
    "https://pbs.twimg.com/profile_images/378800000343295379/d47a05e470f6cdcef801d9e52312fc6f.jpeg",
    "https://pbs.twimg.com/profile_images/661327212952457217/FSIcocm1_400x400.jpg",
    "https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/34592/square_thumb%402x.jpg",
    "https://pbs.twimg.com/profile_images/743930229194915840/dAjMU2nA.jpg",
    "https://pbs.twimg.com/profile_images/626449225052585984/0q5OffaF_400x400.jpg",
  ];

  const pictures = peoplePictures.map((picture, index) => {
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
