const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    unique: true,
    trim: true
  },
  login: {
    type: String,
    required: true,
    minlength: 1,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre("save", function(next) {
  let user = this;

  if (!user.isModified("password")) {
    return next();
  } else {
  }

  bcrypt
    .genSalt(12)
    .then(salt => {
      return bcrypt.hash(user.password, salt);
    })
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

module.exports = mongoose.model("User", UserSchema);
