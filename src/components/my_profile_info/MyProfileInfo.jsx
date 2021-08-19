/** @format */

import "./myprofileinfo.css";

export default function MyProfileInfo() {
  const profileInfo = [
    { id: "firstname", label: "First Name", type: "text" },
    { id: "lastname", label: "Last Name", type: "text" },
    { id: "date", label: "Date of Birth", type: "date" },
    { id: "email", label: "Email", type: "email" },
    { id: "password", label: "Password", type: "password" },
    { id: "education", label: "Education", type: "text" },
    { id: "workplace", label: "Workplace", type: "text" },
    { id: "about", label: "Talk About Yourself", type: "text" },
  ];
  const information = profileInfo.map((info, index) => {
    return <div>{info.label}</div>;
  });
  return (
    <div>
      <form noValidate autoComplete="off" className="form">
        {information}
      </form>
    </div>
  );
}
