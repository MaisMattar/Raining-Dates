/** @format */

import "./groups.css";
import { Link } from "react-router-dom";

export default function Groups(props) {
  const groups = props.ageGroups.map((group, index) => {
    return (
      <Link className="groupsLink" to={`/${group}`}>
        <li key={group} className="groupListItem">
          <div className="groupListItemText">{group}</div>
        </li>
      </Link>
    );
  });
  return <ul className="groupList">{groups}</ul>;
}
