var handleError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET || "some other secret as default";

const Controller = require("./Controller");
const UserService = require("../../services/UserService");
const User = require("../../database/models/user");

const userService = new UserService(new User().getInstance());

class UserController extends Controller {
  constructor(service) {
    super(service);
  }

  async login(req, res, next) {
    const errors = {};
    const { login, password } = req.body;

    let user = undefined;
    if (login) {
      user = await userService.findOneByLoginWithPassword(login);
    }

    // return if there was no user with this username found in the database
    if (!user) {
      errors.message = "No Account Found";
      return res.status(400).json(errors);
    }

    let isMatch = await bcrypt.compare(password, user.password);

    // return 400 if password does not match
    if (!isMatch) {
      errors.message = "Password is incorrect";
      return res.status(400).json(errors);
    }

    const payload = {
      id: user._id,
      username: user.username
    };

    const token = await jwt.sign(payload, secret, { expiresIn: 36000 });

    // return 500 if token is incorrect
    if (!token) {
      return res.status(500).json({ error: "Error signing token", raw: err });
    }

    return res.json({
      success: true,
      token: `Bearer ${token}`
    });
  }

  signup(req, res, next) {
    const { name, login, password, permissionLevel } = req.body;

    var errors = {};
    const user = userService.findOneByLoginWithPassword(req.body.login);

    if (user) {
      // return res.status(400).json({});
      next(handleError("User not exists"));
    }

    try {
      const newUser = new User({ name, login, password, permissionLevel });
      userService.validate(newUser);

      userService.insert(newUser);

      return res.status(200).json({});
    } catch (err) {
      // errors = e;
      // return res.status(400).json(e);
      next(handleError(err));
    }
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
