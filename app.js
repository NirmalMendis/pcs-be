const express = require("express");
const morgan = require("morgan");

const app = express();

/* use morgan in dev env */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//live test
app.get("/api/v1/ping", (req, res) => {
  res.status(200).send("Server is live");
});

module.exports = app;
