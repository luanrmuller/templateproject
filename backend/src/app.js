const handleError = require("http-errors");
const errorHandler = require('./middleware/HttpErrorsMiddleware');
const express = require("express");
const routes = require("./routes/routes");
const passport = require("passport");
const celebrate = require("celebrate");
const cors = require("cors");

const app = express();

//---------------------------------------------------------------------------
// ! Cors
var corsOptions = {
  // origin: "http://localhost:5000",
  exposedHeaders: ["X-Total-Count"]
};

require("./database/database");

app.use(cors(corsOptions));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//---------------------------------------------------------------------------
// ! passport
app.use(passport.initialize());
require("./config/auth")(passport);

//---------------------------------------------------------------------------
// ! Celebrate errors
app.use(celebrate.errors());

//---------------------------------------------------------------------------
// ! Routes
app.use(routes);

//---------------------------------------------------------------------------
// ! catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(handleError(404, "Not found", { code: 404 }));
});

//---------------------------------------------------------------------------
// ! error handler
app.use(errorHandler({ debug: true }));

// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};
//   res.status(err.status || 500);
//   return res.status(404).json(err);
// });

module.exports = app;
