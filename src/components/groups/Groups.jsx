/** @format */

import "./groups.css";
import { Link } from "react-router-dom";

export default function Groups(props) {
  const groups = props.ageGroups.map((group, index) => {
    return (
      <Link key={group.text} className="groupsLink" to={`/${group.text}`}>
        <li className="groupListItem">
          <div className="groupListItemText">{group.text}</div>
        </li>
      </Link>
    );
  });
  return <ul className="groupList">{groups}</ul>;
}
