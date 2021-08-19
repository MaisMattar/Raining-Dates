/** @format */

import { IconButton } from "@material-ui/core";
import { Add, DeleteOutline } from "@material-ui/icons";
import "./myprofilepictures.css";

export default function ProfilePictures() {
  const profilePictures = [
    "https://www.stylist.co.uk/images/app/uploads/2021/06/24115325/jennifer-aniston-crop-1624532037-1172x1172.jpg?w=256&h=256&fit=max&auto=format%2Ccompress",
    "https://pbs.twimg.com/profile_images/3239748126/f73e55b4feda2eab9a3798fa3eda896a.jpeg",
    "https://www.stylist.co.uk/images/app/uploads/2019/09/11115601/jennifer-aniston-crop-1568199404-896x896.jpg?w=256&h=256&fit=max&auto=format%2Ccompress",
    "https://pbs.twimg.com/profile_images/656013279815270400/64NhuSut_400x400.jpg",
    "https://pbs.twimg.com/profile_images/429010555836174336/gUrccdi3.jpeg",
  ];

  const pictures = profilePictures.map((picture, index) => {
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
