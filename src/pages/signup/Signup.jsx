/** @format */

import "../login/login.css";

const registerInfo = [
  "First Name",
  "Last Name",
  "Date of Birth",
  "Email",
  "Password",
];

export default function Signup() {
  const registerInfoInputs = registerInfo.map((info, index) => {
    return <input placeholder={info} className="loginInput" key={index} />;
  });
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Raining Dates</h3>
          <span className="loginDesc">Find your next date</span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            {registerInfoInputs}
            <button className="registerButton">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}
