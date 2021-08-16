/** @format */

import "./profilepictures.css";

export default function ProfilePictures(props) {
  const pictures = props.profilePictures.map((picture, index) => {
    return (
      <li key={index} className="pictureListItem">
        <img src={picture} alt={index} className="picture"></img>
      </li>
    );
  });
  return (
    <div>
      <ul className="pictureList">{pictures}</ul>
    </div>
  );
}
