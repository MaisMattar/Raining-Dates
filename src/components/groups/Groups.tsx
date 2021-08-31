/** @format */

import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { FunctionComponent } from "react";

interface Group {
  text: string;
  startAge: number;
  endAge: number;
}

interface GroupsProps {
  ageGroups: Array<Group>;
}

export const Groups: FunctionComponent<GroupsProps> = ({ ageGroups }) => {
  const ListItem = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 180px;
    background-color: rgb(91, 151, 200);
    cursor: pointer;
    border-radius: 1em;
    -webkit-box-shadow: 4px 3px 6px 2px rgba(0, 0, 0, 0.76);
    box-shadow: 4px 3px 6px 2px rgba(0, 0, 0, 0.76);
  `;

  const List = styled.ul`
    list-style: none;
    display: grid;
    margin: 30px auto 30px auto;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 2em;
    max-width: 960px;
  `;

  const GroupLink = styled(Link)`
    text-decoration: none;
    width: 250px;
  `;

  const Text = styled.div`
    font-size: 40px;
    color: white;
  `;

  const groups = ageGroups.map((group: Group, index: number) => {
    return (
      <GroupLink key={group.text} to={`/${group.text}`}>
        <ListItem>
          <Text>{group.text}</Text>
        </ListItem>
      </GroupLink>
    );
  });

  return <List>{groups}</List>;
};
