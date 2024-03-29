import "babel-polyfill";
import React from "react";
import { renderToString } from "react-dom/server";
import { renderRoutes } from "react-router-config";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Routes from "../client/Routes";
import serialize from "serialize-javascript";
export default (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );
  return `
        <html>
            <head></head>
            <body>
                <div id="root">${content}</div>
                <script>window.INITIAL_DATA = ${serialize(
                  store.getState()
                )}</script>
                <script src="bundle.js"></script>
               
              
            </body>
        </html>
    `;
};
