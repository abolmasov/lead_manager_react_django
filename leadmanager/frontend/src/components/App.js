import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./layout/Header";
import Dashboard from "./leads/Dashboard";
import Login from "./accounts/Login";
import Register from "./accounts/Register";

import PrivateRoute from "./common/PrivateRoute";

import { Provider } from "react-redux";
import store from "../store";

import Alerts from "./layout/Alerts";

import { loadUser } from "../actions/auth";

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

const alertOptions = {
  timeout: 3e3,
  position: "top center"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container">
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
