/** @format */

import "./topbar.css";
import { AccountBox, Chat, ExitToApp } from "@material-ui/icons";

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Raining Dates</span>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <AccountBox />
          </div>
          <div className="topbarIconItem">
            <Chat />
          </div>
          <div className="topbarIconItem">
            <ExitToApp />
          </div>
        </div>
      </div>
    </div>
  );
}
