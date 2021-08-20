import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Home from './pages/home';
import Raffle from './pages/raffle';
import CreateRaffle from './pages/createRaffle';
import Faq from './pages/faq';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/raffle/:id">
            <Raffle />
          </Route>
          <Route exact path="/create">
            <CreateRaffle />
          </Route>
          <Route exact path="/faq">
            <Faq />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            <Redirect to="/"/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
