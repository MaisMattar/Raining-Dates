/** @format */

import Topbar from "../../components/topbar/Topbar";
import "./login.css";

export default function Login() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Raining Dates</h3>
          <span className="loginDesc">Find your next date</span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Email" className="loginInput" />
            <input placeholder="Password" className="loginInput" />
            <button className="loginButton">Log In</button>
            <button className="registerButton">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}
