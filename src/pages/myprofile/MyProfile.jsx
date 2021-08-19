/** @format */

import { Button } from "react-bootstrap";
import MyProfileInfo from "../../components/my_profile_info/MyProfileInfo";
import MyProfilePictures from "../../components/my_profile_pictures/MyProfilePictures";
import Topbar from "../../components/topbar/Topbar";
import "./myprofile.css";
import { useHistory } from "react-router-dom";

export default function MyProfile() {
  const history = useHistory();

  function handleEditProfile(event) {
    history.push("/edit-profile");
  }

  return (
    <>
      <Topbar />
      <div className="myProfileText">Welcome To Your Profile</div>
      <div className="myProfileContainer">
        <div className="myprofileLeft">
          <MyProfilePictures />
        </div>
        <div className="myprofileRight">
          <MyProfileInfo />
          <Button className="editprofileButton" onClick={handleEditProfile}>
            Edit Profile
          </Button>
        </div>
      </div>
    </>
  );
}
