const { Strategy, ExtractJwt } = require("passport-jwt");
const secret = process.env.SECRET || "some other secret as default";

// const User = require("../database/models/user");
const UserController = require("../controllers/registrations/UserController");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

module.exports = passport => {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      await UserController.findById(payload.id)
        .then(user => {
          if (user) {
            return done(null, {
              id: user.id,
              name: user.name,
              permissionLevel: user.permissionLevel
            });
          }

          return done(null, false);
        })
        .catch(err => console.error(err));
    })
  );
};
