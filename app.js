const express = require("express");
const morgan = require("morgan");
const errorHandler = require("./utils/errors/errorHandler");

const customerRouter = require("./routes/customer-routes");

const app = express();

/* use morgan in dev env */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json({ limit: "10kb" }));

//live test
app.get("/api/v1/ping", (req, res) => {
  res.status(200).send("Server is live");
});

app.use("/api/v1/customer", customerRouter);

app.use(errorHandler);

module.exports = app;
