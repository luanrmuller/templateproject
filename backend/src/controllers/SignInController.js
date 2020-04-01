var express = require("express");
var router = express.Router();
const User = require("../database/models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET || "some other secret as default";

router.post("/", async (req, res) => {
  const errors = {};
  const { login, password } = req.body;

  let user = undefined;

  if (login) {
    const username = login;
    user = await User.findOne({ username }).select("+password");
  }

  if (!user) {
    const email = login;
    user = await User.findOne({ email }).select("+password");
  }

  // return if there was no user with this username found in the database
  if (!user) {
    errors.message = "No Account Found";
    return res.status(400).json(errors);
  }

  isMatch = await bcrypt.compare(password, user.password);

  // return 400 if password does not match
  if (!isMatch) {
    errors.message = "Password is incorrect";
    return res.status(400).json(errors);
  }

  const payload = {
    id: user._id,
    username: user.username
  };

  token = await jwt.sign(payload, secret, { expiresIn: 36000 });

  // return 500 if token is incorrect
  if (!token) {
    return res.status(500).json({ error: "Error signing token", raw: err });
  }

  return res.json({
    success: true,
    token: `Bearer ${token}`
  });
});

module.exports = router;
