import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './pages/home';
import Raffle from './pages/raffle';
import CreateRaffle from './pages/createRaffle';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/raffle/:id">
            <Raffle />
          </Route>
          <Route path="/create">
            <CreateRaffle />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
