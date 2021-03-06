/** @format */

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./components/contexts/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import MyProfile from "./pages/myprofile/MyProfile";
import Signup from "./pages/signup/Signup";
import Profile from "./pages/profile/Profile";
import AgeGroup from "./pages/agegroup/AgeGroup";
import PrivateRoute from "./components/PrivateRoute";
import EditProfile from "./pages/edit_profile/EditProfile";
import Topbar from "./components/topbar/Topbar";

function App() {
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
      <PrivateRoute
        key={`/${group.text}`}
        path={`/${group.text}`}
        component={AgeGroup}
        props={{ ageGroup: group }}
      />
    );
  });

  return (
    <>
      <AuthProvider>
        <Router>
          <Topbar />
          <div>
            <Switch>
              <PrivateRoute
                key="/home"
                exact
                path="/"
                component={Home}
                props={{ ageGroups: ageGroups }}
              />
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
}

export default App;
