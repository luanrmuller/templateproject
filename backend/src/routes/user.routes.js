const UserController = require("../controllers/registrations/UserController");

module.exports = (routes, permissionMiddleware) => {
  // POST ROUTES
  routes. patch(
    `/api/users/:id`,
    // permissionMiddleware.minimumPermissionLevelRequired(FREE),
    UserController.updatepassword
  );

  routes.get(`/api/users`, UserController.getAll);
  routes.get(`/api/users/:id`, UserController.getById);
  routes.post(`/users`, UserController.insert);
  routes.post(`/api/users`, UserController.insert);
  routes.put(`/api/users/:id`, UserController.update);
  routes.delete(`/api/users/:id`, UserController.delete);
  routes.options(`/api/users/count`, UserController.count);
};
