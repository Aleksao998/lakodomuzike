import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  withRouter,
} from "react-router-dom";

//Redux store
import { connect } from "react-redux";
import { addAddData } from "../actions/adds";
import NavBar from "components/Navbars/NavBar";
// pages
import AdminLogin from "../views/AdminPanel/AdminLogin/AdminLogin";
import Dashboard from "../views/AdminPanel/AdminDashBoard/AdminDashboard";
import LandingPage from "views/LandingPage/LandingPage";
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
import UpdateProfileEmploler from "views/UpdateProfileEmployer/UpdateProfileEmployer";
import UpdateProfileMusician from "views/UpdateProfileMusician/UpdateProfileMusician";
function AppRouters(props) {
  const [isAutenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [searchBar, setSearchBar] = useState(false);
  const [profileRoute, setProfileRoute] = useState("");
  const [finishLoading, setFinishLoading] = useState("");
  const logOut = () => {
    setIsAuthenticated(false);
    setToken("");
    setUserId("");
    setProfileRoute("");
  };
  React.useEffect(() => {
    fetch("http://localhost:5000/api/v1/ad", {
      method: "GET",
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Error creating User");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        resData.data.forEach((element) => {
          props.dispatch(
            addAddData(
              element.adName,
              element.typeOfMusic,
              element.description,
              element.maintenanceDate.date.slice(0, 10),
              element.maintenanceDate.time,
              element.priceFrom,
              element.priceTo,
              element.location.address,

              element.location.number,
              element.location.city,
              "/single-add-detail/" + element._id,
              element.url
            )
          );
        });
        setFinishLoading(true);
      });
  }, []);
  const authenticateUser = (token, id, route) => {
    setIsAuthenticated(true);
    setToken(token);
    setUserId(id);
    setProfileRoute(route);
  };
  return (
    <div>
      <NavBar
        isAutenticated={isAutenticated}
        profileRoute={profileRoute}
        logOut={logOut}
      />
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <LandingPage
              {...props}
              finishLoading={finishLoading}
              setSearchBar={setSearchBar}
              searchBar={searchBar}
            />
          )}
        />
        <Route
          path="/ads"
          render={(props) => (
            <AdsPage
              {...props}
              finishLoading={finishLoading}
              searchBar={searchBar}
              setSearchBar={setSearchBar}
            />
          )}
        />
        <Route
          path="/admin-login"
          render={(props) => (
            <AdminLogin {...props} authenticateUser={authenticateUser} />
          )}
        />
        <Route
          path="/update-employer"
          render={(props) => <UpdateProfileEmploler {...props} />}
        />
        <Route
          path="/update-musician"
          render={(props) => <UpdateProfileMusician {...props} />}
        />

        <Route
          path="/dashboard/:id"
          render={(props) => <Dashboard {...props} token={token} />}
        />
        <Route
          path="/profile-page-musician/:id"
          render={(props) => <ProfilePageMusician {...props} userId={userId} />}
        />
        <Route
          path="/profile-page-employer/:id"
          render={(props) => <ProfilePageEmployer {...props} />}
        />
        <Route
          path="/single-add-detail/:id"
          render={(props) => (
            <SingleAddDetail
              {...props}
              token={token}
              profileRoute={profileRoute}
              userId={userId}
            />
          )}
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
          path="/500ErrorPage"
          render={(props) => <ErrorPage500 {...props} />}
        />

        <Route render={(props) => <ErrorPage404 {...props} />} />
      </Switch>
    </div>
  );
}
const ConnectedAppRoutes = connect((state) => {
  return {
    store: state,
  };
})(AppRouters);

export default withRouter(ConnectedAppRoutes);
