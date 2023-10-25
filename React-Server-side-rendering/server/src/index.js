import express, { response } from "express";
import proxy from "express-http-proxy";
import renderhelper from "./helpers/renderhelper";
import createStore from "./helpers/createStore";
import { matchRoutes } from "react-router-config";
import Routes from "./client/Routes";
const app = express();

app.use(
  "/api",
  proxy("http://react-ssr-api.herokuapp.com", {
    proxyReqOptDecorator(opts) {
      opts.headers["x-forwarded-host"] = "localhost:3000";
      return opts;
    },
  })
);
app.use(express.static("public"));
app.get("*", (req, res) => {
  const store = createStore(req);

  const route = matchRoutes(Routes, req.path);
  if (route.length) {
    const promises = route.map(({ route }) => {
      return route.loadData ? route.loadData(store) : null;
    });
    Promise.all(promises).then((resp) => {
      res.send(renderhelper(req, store));
    });
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
