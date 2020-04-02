const CustomerController = require("../controllers/registrations/CustomerController");

module.exports = routes => {
  // POST ROUTES
  routes.get(`/api/costumers`, CustomerController.getAll);
  routes.get(`/api/costumers/:id`, CustomerController.getById);
  routes.post(`/api/costumers`, CustomerController.insert);
  routes.put(`/api/costumers/:id`, CustomerController.update);
  routes.patch(`/api/costumers/:id`, CustomerController.patch);
  routes.delete(`/api/costumers/:id`, CustomerController.delete);
  routes.options(`/api/costumers/count`, CustomerController.count);
};
