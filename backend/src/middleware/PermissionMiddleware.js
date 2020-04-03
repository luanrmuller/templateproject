exports.minimumPermissionLevelRequired = permissonLevel => {
  return (req, res, next) => {
    const user_permission_level = parseInt(req.user.permissionLevel);

    if (user_permission_level == 100) {
      //Admin user
      return next();
    }

    if (permissonLevel && user_permission_level >= permissonLevel.getValue()) {
      return next();
    } else {
      return res.status(403).send();
    }
  };
};
