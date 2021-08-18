/** @format */

import "./topbar.css";
import { AccountBox, Chat, ExitToApp } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link className="topbarHomeLink" to="/">
          <span className="logo">Raining Dates</span>
        </Link>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Link className="topbarIconLink" to="/profile">
              <AccountBox />
            </Link>
          </div>
          <div className="topbarIconItem">
            <Chat />
          </div>
          <div className="topbarIconItem">
            <Link className="topbarIconLink" to="/login">
              <ExitToApp />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
