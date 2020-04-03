const UserController = require("../controllers/registrations/UserController");
const EPermissonLevel = require("../utils/EPermissionLevel");

module.exports = (routes, permission) => {
  // * No authenticated router
  routes.post(`/login`, UserController.login);
  routes.post(`/signup`, UserController.signup);

  // * Authenticated router
  routes.patch(`/api/users/:id`, UserController.updatepassword);

  routes.get(
    `/api/users`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.SALES_PERSON),
    UserController.getAll
  );
  routes.get(
    `/api/users/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.SALES_PERSON),
    UserController.getById
  );
  routes.get(
    `/api/usersCount`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.SALES_PERSON),
    UserController.count
  );
  routes.post(
    `/api/users`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.MANAGER),
    UserController.insert
  );
  routes.put(
    `/api/users/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.COORDINATOR),
    UserController.update
  );
  routes.patch(
    `/api/users/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.COORDINATOR),
    UserController.update
  );
  routes.delete(
    `/api/users/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.MANAGER),
    UserController.delete
  );
};
