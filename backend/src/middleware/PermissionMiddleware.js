exports.minimumPermissionLevelRequired = required_permission_level => {
  return (req, res, next) => {
    const user_permission_level = parseInt(req.user.permissionLevel);

    if (user_permission_level == 100) {
      //Admin user
      return next();
    }

    if (user_permission_level >= required_permission_level) {
      return next();
    } else {
      return res.status(403).send();
    }
  };
};
