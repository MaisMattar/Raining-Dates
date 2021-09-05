/** @format */

/** @jsxRuntime classic */
/** @jsx jsx */

import { Link } from "react-router-dom";
import { FunctionComponent } from "react";
import { jsx } from "@emotion/react";
import { groupStyles } from "./GroupStyles";

interface Group {
  text: string;
  startAge: number;
  endAge: number;
}

interface GroupsProps {
  ageGroups: Array<Group>;
}

export const Groups: FunctionComponent<GroupsProps> = ({ ageGroups }) => {
  const { listItem, list, groupLink, text } = groupStyles;

  const groups = ageGroups.map((group: Group, index: number) => {
    return (
      <Link css={groupLink} key={group.text} to={`/${group.text}`}>
        <li css={listItem}>
          <div css={text}>{group.text}</div>
        </li>
      </Link>
    );
  });

  return <ul css={list}>{groups}</ul>;
};
