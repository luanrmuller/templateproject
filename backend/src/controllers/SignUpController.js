var handleError = require("http-errors");
var express = require("express");
var router = express.Router();

const User = require("../database/models/user");
// const UserController = require("../controllers/registrations/UserController");
const UserService = require("../services/UserService");

const userService = new UserService(new User().getInstance());

router.post("/", async (req, res, next) => {
  const { name, login, password, permissionLevel } = req.body;
  var errors = {};
  const user = await userService.findOneByLoginWithPassword(req.body.login);

  if (user) {
    // return res.status(400).json({});
    next(handleError(400, "User not found"));
  }
  
  const newUser = new User({ name, login, password, permissionLevel });

  try {
    await userService.insert(newUser);
  } catch (e) {
    errors = e;
    return res.status(400).json(e);
  }

  return res.status(200).json({});
});

module.exports = router;
