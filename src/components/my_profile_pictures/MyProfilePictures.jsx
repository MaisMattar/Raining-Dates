/** @format */

import { IconButton } from "@material-ui/core";
import { Add, DeleteOutline } from "@material-ui/icons";
import "./myprofilepictures.css";

export default function ProfilePictures(props) {
  const pictures = props.profilePictures.map((picture, index) => {
    return (
      <li key={index} className="myPictureListItem">
        <img src={picture} alt={index} className="myPicture"></img>
        <IconButton className="myDeleteButton">
          <DeleteOutline className="myPictureRemove" />
        </IconButton>
      </li>
    );
  });
  return (
    <div>
      <ul className="myPictureList">
        {pictures}
        <li>
          {/* <div className="myAddPicture"> */}
          <IconButton className="myAddButton">
            <Add className="myAddIcon" />
          </IconButton>
          {/* <div className="myAddIcon">+</div> */}
          {/* </div> */}
        </li>
      </ul>
    </div>
  );
}
