var express = require("express");
var router = express.Router();

// const User = require("../database/models/user");
const UserController = require("../controllers/registrations/UserController");

router.post("/", async (req, res) => {
  var errors = {};
  const user = await UserController.findOne(req.body.login);

  const newUser = new User({ ...req.body });

  try {
    await newUser.save();
  } catch (e) {
    errors = e;
    return res.status(400).json(e);
  }

  return res.status(200).json({});
});

module.exports = router;
