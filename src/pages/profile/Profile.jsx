/** @format */

import ProfilePictures from "../../components/profile_pictures/ProfilePictures";
import ProfileInfo from "../../components/profile_info/ProfileInfo";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";
import { Favorite, NotInterested } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

const profilePictures = [
  "https://pbs.twimg.com/profile_images/658970219507904513/4eK6qnpt.jpg",
  "https://tellmemore.media/wp-content/uploads/2018/06/brad-pitt-zag-geen-andere-optie-dan-rechter-stappen-kinderen.jpg",
  "https://pbs.twimg.com/profile_images/378800000602170864/a336765d37b92533ad2c10aec1c9ee71.jpeg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu11AHaYC-ZFuTbtSTYFqwBbE6LFwli1Xo1w&usqp=CAU",
  "https://tellmemore.media/wp-content/uploads/2019/02/vervolg-op-world-war-z-met-brad-pitt-geannnuleerd.jpg",
  "https://gonevis.s3.amazonaws.com/dolphin/5c0e5a77-1209-4b8b-ba8f-bf4a6e72a389/thumb_256x256_1568984715143_z25087561ICR-Pewnego-razu----w-Hollywood--pojawil-sie-Brad-Pit.jpg",
];

const profileInfoDesc = [
  "First Name",
  "Last Name",
  "Date of Birth",
  "Education",
  "Workplace",
  "About",
];

const profileInfo = [
  "Brad",
  "Pitt",
  "December 18, 1963",
  "Actor",
  "Hollywood",
  "bla bla bla dfhakhfgkerhflwskefjlfgjlsdjslgjhlrdfk;flkhfkhfskdhfldkfgkjdhfgjkhdfgdgjse;dekfjg;sdlkfljgsldojfkdhgolsdwslwghrerhugk",
];

export default function Profile() {
  return (
    <>
      <Topbar />
      <div className="profileText">Brad Pitt's Profile</div>
      <div className="profileContainer">
        <ProfilePictures profilePictures={profilePictures} />
        <ProfileInfo
          profileInfoDesc={profileInfoDesc}
          profileInfo={profileInfo}
        />
      </div>
      <div className="profileButtons">
        <IconButton className="profileInterested">
          <Favorite className="favoriteIcon" />
        </IconButton>
        <IconButton className="profileNotInterested">
          <NotInterested className="notInterestedIcon" />
        </IconButton>
      </div>
    </>
  );
}
