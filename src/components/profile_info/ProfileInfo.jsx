/** @format */

import "./profileinfo.css";

export default function ProfileInfo(props) {
  const profileInfoDesc = props.profileInfoDesc.map((info, index) => {
    return <div className="infoDesc">{info}</div>;
  });
  const profileInfo = props.profileInfo.map((info, index) => {
    return <div className="infoText">{info}</div>;
  });
  return (
    <div className="profileInfoWrapper">
      <div className="profileInfoDesc">{profileInfoDesc}</div>
      <div className="profileInfo">{profileInfo}</div>
    </div>
  );
}
