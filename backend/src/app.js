var handleError = require("http-errors");
const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");
const routes = require("./routes");
var passport = require("passport");

const app = express();

require("./database/db");

app.use(passport.initialize());
require("./config/auth")(passport);

app.use(express.urlencoded({ extended: false }));

app.use(cors({
  exposedHeaders: [ 'X-Total-Count'],
}));
app.use(express.json());
app.use(routes);
app.use(errors());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(handleError(404, "Not found", { code: 404 }));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  return res.status(404).json(err);
});

module.exports = app;
