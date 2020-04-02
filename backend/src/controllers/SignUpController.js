var express = require("express");
var router = express.Router();

const User = require("../database/models/user");

router.post("/", async (req, res) => {
  var errors = {};
  const user = await User.findOne({ username: req.body.username });

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
