/** @format */

/** @jsxRuntime classic */
/** @jsx jsx */

import { Groups } from "../../components/groups/groups";
import { FunctionComponent } from "react";
import { css, jsx } from "@emotion/react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";

interface Group {
  text: string;
  startAge: number;
  endAge: number;
}

interface HomeProps {
  ageGroups: Array<Group>;
}

const homeText = css`
  text-align: center;
  margin-top: 30px;
  color: rgb(62, 121, 170);
  font-size: 30px;
`;

export const Home: FunctionComponent<HomeProps> = (props) => {
  const email = useSelector((state: RootState) => state.updateUserStatus.email);
  const isLoggedIn = useSelector(
    (state: RootState) => state.updateUserStatus.isLoggedIn
  );
  console.log("email = ", email);
  console.log("isLoggedIn = ", isLoggedIn);

  return (
    <div>
      <div css={homeText}>Pick your preferred age group</div>
      <div>
        <Groups ageGroups={props.ageGroups} />
      </div>
    </div>
  );
};
