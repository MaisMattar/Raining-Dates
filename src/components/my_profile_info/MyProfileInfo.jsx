/** @format */

import "./myprofileinfo.css";
import { TextField } from "@material-ui/core";

export default function MyProfileInfo(props) {
  const information = props.profileInfo.map((info, index) => {
    return <TextField id={info.id} label={info.value} className="textField" />;
  });
  return (
    <div>
      <form noValidate autoComplete="off" className="form">
        {information}
      </form>
      <button>Save Changes</button>
    </div>
  );
}
