import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";

import Home from './pages/home';
import Raffle from './pages/raffle';
import CreateRaffle from './pages/createRaffle';
import Faq from './pages/faq';
import {loadAddress} from "./storage/store";
import {connect} from "react-redux";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FF5537"
    }
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "#fff",
        },
      },
    },
  },
});

function App(props) {

  React.useEffect(() => {
    props.loadWallet()
  }, [])

  return (
    <MuiThemeProvider theme={theme}>
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
    </MuiThemeProvider>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {
  return {
    loadWallet: () => dispatch(loadAddress())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
