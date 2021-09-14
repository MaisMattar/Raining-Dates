/** @format */

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./Components/Contexts/AuthContext";
import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import { MyProfile } from "./Pages/MyProfile/MyProfile";
import { Signup } from "./Pages/Signup/Signup";
import { Profile } from "./Pages/Profile/Profile";
import { AgeGroup } from "./Pages/AgeGroup/AgeGroup";
import { PrivateRoute } from "./Components/PrivateRoute";
import { EditProfile } from "./Pages/EditProfile/EditProfile";
import { Topbar } from "./Components/Topbar/Topbar";
import { FunctionComponent } from "react";

export const App: FunctionComponent = () => {
  const ageGroups = [
    { text: "20-30", startAge: 20, endAge: 30 },
    { text: "30-40", startAge: 30, endAge: 40 },
    { text: "40-50", startAge: 40, endAge: 50 },
    { text: "50-60", startAge: 50, endAge: 60 },
    { text: "60-70", startAge: 60, endAge: 70 },
    { text: "70-80", startAge: 70, endAge: 80 },
  ];

  const ageGroupsRoutes = ageGroups.map((group) => {
    return (
      <PrivateRoute key={`/${group.text}`} path={`/${group.text}`}>
        <AgeGroup ageGroup={group} />
      </PrivateRoute>
    );
  });

  return (
    <>
      <AuthProvider>
        <Router>
          <Topbar />
          <div>
            <Switch>
              <PrivateRoute key="/home" exact path="/">
                <Home ageGroups={ageGroups} />
              </PrivateRoute>
              {ageGroupsRoutes}
              <PrivateRoute
                key="/myprofile"
                path="/myprofile"
                component={MyProfile}
              />
              <PrivateRoute
                key="/profile/:email"
                path="/profile/:email"
                component={Profile}
              />
              <PrivateRoute
                key="/edit-profile"
                path="/edit-profile"
                component={EditProfile}
              />
              <Route key="/login" path="/login" component={Login} />
              <Route key="/signup" path="/signup" component={Signup} />
            </Switch>
          </div>
        </Router>
      </AuthProvider>
    </>
  );
};
