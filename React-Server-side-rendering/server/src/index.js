import express from "express";
import renderhelper from "./helpers/renderhelper";
import createStore from "./helpers/createStore";
const app = express();
app.use(express.static("public"));
app.get("*", (req, res) => {
  const store = createStore();
  res.send(renderhelper(req, store));
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
