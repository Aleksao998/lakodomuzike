import React, { useState } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import NavBar from "components/Navbars/NavBar";
// pages
import Index from "views/Index.js";
import LandingPage from "views/LandingPage/LandingPage";
import ProfilePage from "views/ProfilePage/ProfilePage";
import RegisterPage from "views/RegistrationPage/RegisterPage";
import RegisterPageMusician from "views/RegistrationPage/RegistrationMusician/RegistrationMusicianPage";
import RegisterPageEmployer from "views/RegistrationPage/RegistrationEmployer/RegistrationEmployerPage";
import LoginPage from "views/LoginPage/LoginPage";
import ErrorPage404 from "views/ErrorPages/404ErrorPage/404ErrorPage";
import ErrorPage500 from "views/ErrorPages/500ErrorPage/500ErrorPage";

import ProfilePageMusician from "views/ProfilePage/ProfilePageMusician/ProfilePageMusician";
import ProfilePageEmployer from "views/ProfilePage/ProfilePageEmployer/ProfilePageEmployer";
import AdsPage from "views/AdsPage/Ads";
import SingleAddDetail from "views/SingleAddDetail/SingleAddDetail";
function Router() {
  const [isAutenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [profileRoute, setProfileRoute] = useState("");
  const logOut = () => {
    setIsAuthenticated(false);
    setToken("");
    setUserId("");
    setProfileRoute("");
  };
  const authenticateUser = (token, id, route) => {
    setIsAuthenticated(true);
    setToken(token);
    setUserId(id);
    setProfileRoute(route);
  };
  return (
    <div>
      <BrowserRouter>
        <NavBar
          isAutenticated={isAutenticated}
          profileRoute={profileRoute}
          logOut={logOut}
        />
        <Switch>
          <Route
            path="/lakodomuzike/"
            render={(props) => <LandingPage {...props} />}
          />
          <Route path="/ads" render={(props) => <AdsPage {...props} />} />
          <Route
            path="/profile-page-musician"
            render={(props) => <ProfilePageMusician {...props} />}
          />
          <Route
            path="/profile-page-employer/:id"
            render={(props) => <ProfilePageEmployer {...props} />}
          />
          <Route
            path="/single-add-detail"
            render={(props) => <SingleAddDetail {...props} />}
          />
          <Route
            path="/register-page"
            render={(props) => <RegisterPage {...props} />}
          />
          <Route
            path="/register-page-musician"
            render={(props) => (
              <RegisterPageMusician
                {...props}
                authenticateUser={authenticateUser}
              />
            )}
          />
          <Route
            path="/register-page-employer"
            render={(props) => (
              <RegisterPageEmployer
                {...props}
                authenticateUser={authenticateUser}
              />
            )}
          />

          <Route
            path="/login-page"
            render={(props) => (
              <LoginPage {...props} authenticateUser={authenticateUser} />
            )}
          />
          <Route
            path="/404ErrorPage"
            render={(props) => <ErrorPage404 {...props} />}
          />
          <Route
            path="/500ErrorPage"
            render={(props) => <ErrorPage500 {...props} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Router;
