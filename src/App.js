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

function App() {
  const ageGroups = ["20-30", "30-40", "40-50", "50-60", "60-70", "70-80"];

  const ageGroupsRoutes = ageGroups.map((group) => {
    return (
      <PrivateRoute
        path={`/${group}`}
        component={AgeGroup}
        props={{ ageGroup: group }}
      />
    );
  });

  return (
    <AuthProvider>
      <Router>
        <div>
          <Switch>
            <PrivateRoute
              exact
              path="/"
              component={Home}
              props={{ ageGroups: ageGroups }}
            />
            {ageGroupsRoutes}
            <PrivateRoute path="/myprofile" component={MyProfile} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/edit-profile" component={EditProfile} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
