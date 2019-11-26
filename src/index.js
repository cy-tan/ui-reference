import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import * as serviceWorker from "./serviceWorker";

import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Cloning from "./containers/Cloning";
import Entry from "./containers/Entry";
import Home from "./containers/Home";

const routing = (
  <Router>
    <Route path="/cloning" exact component={Cloning} />
    <Route path="/entry" exact component={Entry} />
    <Route path="/" exact component={Cloning} />
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
