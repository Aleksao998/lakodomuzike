import React from "react";
import ReactDOM from "react-dom";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";
import "./styles/style.scss";

import Router from "./routers/Routers";
// others

ReactDOM.render(<Router />, document.getElementById("root"));
