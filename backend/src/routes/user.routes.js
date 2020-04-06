const UserController = require("../controllers/registrations/UserController");
const EPermissonLevel = require("../utils/EPermissionLevel");

module.exports = (router, permission) => {
  // * No authenticated router
  router.post(`/login`, UserController.login);
  router.post(`/signup`, UserController.signup);

  // * Authenticated router
  router.patch(`/api/users/:id`, UserController.updatepassword);

  router.get(
    `/api/users`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.SALES_PERSON),
    UserController.getAll
  );
  router.get(
    `/api/users/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.SALES_PERSON),
    UserController.getById
  );
  router.get(
    `/api/usersCount`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.SALES_PERSON),
    UserController.count
  );
  router.post(
    `/api/users`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.MANAGER),
    UserController.insert
  );
  router.put(
    `/api/users/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.COORDINATOR),
    UserController.update
  );
  router.patch(
    `/api/users/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.COORDINATOR),
    UserController.update
  );
  router.delete(
    `/api/users/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.MANAGER),
    UserController.delete
  );
};
