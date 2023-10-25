import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import * as createHistory from "history";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./reducers";
import { renderRoutes } from "react-router-config";
import Routes from "./Routes";
import { Router } from "react-router-dom";
const axiosInstance = axios.create({
  baseURL: "/api",
});

const history = createHistory.createBrowserHistory();
const store = createStore(
  reducers,
  window.INITIAL_DATA,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);
ReactDOM.hydrate(
  <Provider store={store}>
    <Router history={history}>
      <div>{renderRoutes(Routes)}</div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
