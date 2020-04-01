const passport = require("passport");
const doPassport = require("./passport-config");

module.exports = app => {
  app.use(passport.initialize());
  doPassport(passport);
};
