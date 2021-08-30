/**
 * @format
 * @jsxImportSource @emotion/react
 */

import "./groups.css";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

export default function Groups(props) {
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

  const groups = props.ageGroups.map((group, index) => {
    return (
      <Link
        key={group.text}
        css={css`
          text-decoration: none;
          width: 250px;
        `}
        to={`/${group.text}`}
      >
        <ListItem>
          <div
            css={css`
              font-size: 40px;
              color: white;
            `}
          >
            {group.text}
          </div>
        </ListItem>
      </Link>
    );
  });

  return <List>{groups}</List>;
}
