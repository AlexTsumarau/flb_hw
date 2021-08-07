import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import ConnectionsContainer from "./components/Connections";
import LinesContainer from "./components/Lines";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/connections"} className="nav-link">Connections</Link>
          </li>
          <li className="nav-item">
            <Link to={"/lines"} className="nav-link">Lines</Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/connections"]} component={ConnectionsContainer} />
          <Route path="/lines" component={LinesContainer} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
