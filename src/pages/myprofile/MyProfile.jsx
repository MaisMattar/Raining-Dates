/** @format */

import MyProfileInfo from "../../components/my_profile_info/MyProfileInfo";
import MyProfilePictures from "../../components/my_profile_pictures/MyProfilePictures";
import Topbar from "../../components/topbar/Topbar";
import "./myprofile.css";

const profileInfo = [
  { id: "first name", value: "First Name" },
  { id: "last name", value: "Last Name" },
  { id: "date", value: "Date of Birth" },
  { id: "email", value: "Email" },
  { id: "password", value: "Password" },
  { id: "education", value: "Education" },
  { id: "workplace", value: "Workplace" },
  { id: "about", value: "Talk About Yourself" },
];

const profilePictures = [
  "https://www.stylist.co.uk/images/app/uploads/2021/06/24115325/jennifer-aniston-crop-1624532037-1172x1172.jpg?w=256&h=256&fit=max&auto=format%2Ccompress",
  "https://pbs.twimg.com/profile_images/3239748126/f73e55b4feda2eab9a3798fa3eda896a.jpeg",
  "https://www.stylist.co.uk/images/app/uploads/2019/09/11115601/jennifer-aniston-crop-1568199404-896x896.jpg?w=256&h=256&fit=max&auto=format%2Ccompress",
  "https://pbs.twimg.com/profile_images/656013279815270400/64NhuSut_400x400.jpg",
  "https://pbs.twimg.com/profile_images/429010555836174336/gUrccdi3.jpeg",
];

export default function MyProfile() {
  return (
    <>
      <Topbar />
      <div className="myProfileText">Welcome To Your Profile</div>
      <div className="myProfileContainer">
        <MyProfilePictures profilePictures={profilePictures} />
        <MyProfileInfo profileInfo={profileInfo} />
      </div>
    </>
  );
}
