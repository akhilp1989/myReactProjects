import React from "react";
import ReactDOM from "react-dom";
import * as createHistory from "history";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import { Router } from "react-router-dom";
const store = createStore(reducers, {}, applyMiddleware(thunk));
const history = createHistory.createBrowserHistory();
import Routes from "./Routes";
export default history;
ReactDOM.hydrate(
  <Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById("root")
);
