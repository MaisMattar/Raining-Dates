/** @format */

import React from "react";
import "./groups.css";

export default function Groups(props) {
  const groups = props.ageGroups.map((group, index) => {
    return (
      <li key={index} className="groupListItem">
        <div className="groupListItemText">{group}</div>
      </li>
    );
  });
  return <ul className="groupList">{groups}</ul>;
}
