const Controller = require("./Controller");
const UserService = require("../../services/UserService");
const User = require("../../database/models/user");

const userService = new UserService(new User().getInstance());

var express = require("express");
// var router = express.Router();
const bcrypt = require("bcryptjs");
// const passport = require("passport");

class UserController extends Controller {
  constructor(service) {
    super(service);
  }

  async findOneByLoginWithPassword(login) {
    return await userService.findOneByLoginWithPassword(login);
  }

  async findById(id) {
    return await userService.findById(id);
  }

  async updatepassword(req, res, next) {
    const login = req.user.login;
    const oldPassword = req.body.oldpassword;
    const newPassword = req.body.password;

    const dbUser = await userService.findOneWithPassword(login);

    const passwordMatch = await new Promise((resolve, reject) => {
      bcrypt.compare(oldPassword, dbUser.password, function(err, isMatch) {
        console.log(err);

        if (err) return reject(err);
        resolve(isMatch);
      });
    });
    if (!passwordMatch) {
      return res.status(400).json({ message: "Old password incorrect." });
    }

    console.log(dbUser);
    dbUser.password = newPassword;
    console.log(dbUser.password);
    try {
      await dbUser.save();
    } catch (e) {
      return res.status(400).json(e);
    }
    res.status(200).json();
  }
}

module.exports = new UserController(userService);

// router.get(
//   "/me",
//   passport.authenticate("jwt", { session: false }),
//   async function(req, res, next) {
//     const username = req.user.username;
//     const dbUser = await User.findOne({ username });
//     res.status(200).json(dbUser);
//   }
// );

// router.post(
//   "/me/update-password",
//   passport.authenticate("jwt", { session: false }),
//   async function(req, res, next) {
//     const username = req.user.username;
//     const oldPassword = req.body.oldpassword;
//     const newPassword = req.body.password;

//     const dbUser = await User.findOne({ username }).select("+password");

//     const passwordMatch = await new Promise((resolve, reject) => {
//       bcrypt.compare(oldPassword, dbUser.password, function(err, isMatch) {
//         console.log(err);

//         if (err) return reject(err);
//         resolve(isMatch);
//       });
//     });
//     if (!passwordMatch) {
//       return res.status(400).json({ message: "Old password incorrect." });
//     }

//     console.log(dbUser);
//     dbUser.password = newPassword;
//     console.log(dbUser.password);
//     try {
//       await dbUser.save();
//     } catch (e) {
//       return res.status(400).json(e);
//     }
//     res.status(200).json();
//   }
// );

// module.exports = router;
