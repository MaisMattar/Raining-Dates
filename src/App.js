/** @format */

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthProvider } from "./components/contexts/AuthContext";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import MyProfile from "./pages/myprofile/MyProfile";
import Signup from "./pages/signup/Signup";
import Profile from "./pages/profile/Profile";
import AgeGroup from "./pages/agegroup/AgeGroup";

function App() {
  const ageGroups = ["20-30", "30-40", "40-50", "50-60", "60-70", "70-80"];

  const peoplePictures = [
    "https://pbs.twimg.com/profile_images/658970219507904513/4eK6qnpt.jpg",
    "https://pbs.twimg.com/profile_images/378800000343295379/d47a05e470f6cdcef801d9e52312fc6f.jpeg",
    "https://pbs.twimg.com/profile_images/661327212952457217/FSIcocm1_400x400.jpg",
    "https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/34592/square_thumb%402x.jpg",
    "https://pbs.twimg.com/profile_images/743930229194915840/dAjMU2nA.jpg",
    "https://pbs.twimg.com/profile_images/626449225052585984/0q5OffaF_400x400.jpg",
  ];

  const ageGroupsRoutes = ageGroups.map((group, index) => {
    return (
      <Route path={`/${group}`}>
        <AgeGroup peoplePictures={peoplePictures} ageGroup={group} />
      </Route>
    );
  });

  return (
    <AuthProvider>
      <Router>
        <div>
          <Switch>
            {ageGroupsRoutes}
            <Route path="/myprofile">
              <MyProfile />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/">
              <Home ageGroups={ageGroups} />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
