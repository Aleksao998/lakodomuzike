import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";
import "./styles/style.scss";

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
import AdsPage from "./views/AdsPage/Ads";
import SingleAddDetail from "./views/SingleAddDetail/SingleAddDetail";
// others

ReactDOM.render(
  <div>
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/index" render={(props) => <LandingPage {...props} />} />
        <Route path="/ads" render={(props) => <AdsPage {...props} />} />
        <Route
          path="/profile-page-musician"
          render={(props) => <ProfilePageMusician {...props} />}
        />
        <Route
          path="/profile-page-employer"
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
          render={(props) => <RegisterPageMusician {...props} />}
        />
        <Route
          path="/register-page-employer"
          render={(props) => <RegisterPageEmployer {...props} />}
        />

        <Route
          path="/login-page"
          render={(props) => <LoginPage {...props} />}
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
  </div>,
  document.getElementById("root")
);
