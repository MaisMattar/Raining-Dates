/** @format */

import "./topbar.css";
import { AccountBox, Chat, ExitToApp } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../components/contexts/AuthContext";
import { useState } from "react";

export default function Topbar() {
  const { logout } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      console.log("logged out");
      history.push("/login");
    } catch {
      setError("Failed to logout");
    }
  }
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
            <Link className="topbarIconLink" to="/myprofile">
              <AccountBox />
            </Link>
          </div>
          <div className="topbarIconItem">
            <Chat />
          </div>
          <div className="topbarIconItem">
            <Link className="topbarIconLink" to="/login">
              <ExitToApp onClick={handleLogout} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
