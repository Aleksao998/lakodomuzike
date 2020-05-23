import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import throttle from "lodash.throttle";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";
import "./styles/style.scss";

import Router from "./routers/Routers";
// others
//Redux store
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

//LocalStorage
import { saveStore } from "./localStorage/localStorage";

const options = {
  position: positions.BOTTOM_RIGHT,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE,
};

const store = configureStore();
store.subscribe(
  throttle(() => {
    saveStore(store.getState());
  }, 1000)
);
ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <BrowserRouter>
      <Provider store={store}>
        <Router store={store} />
      </Provider>
    </BrowserRouter>
  </AlertProvider>,
  document.getElementById("root")
);
