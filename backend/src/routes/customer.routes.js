const CustomerController = require("../controllers/registrations/CustomerController");
const EPermissonLevel = require("../utils/EPermissionLevel");

module.exports = (routes, permission) => {
  // POST ROUTES
  routes.get(
    `/api/customers`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.SALES_PERSON),
    CustomerController.getAll
  );
  routes.get(
    `/api/customers/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.SALES_PERSON),
    CustomerController.getById
  );
  routes.get(
    `/api/customersCount`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.SALES_PERSON),
    CustomerController.count
  );
  routes.post(
    `/api/customers`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.MANAGER),
    CustomerController.insert
  );
  routes.put(
    `/api/customers/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.COORDINATOR),
    CustomerController.update
  );
  routes.patch(
    `/api/customers/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.COORDINATOR),
    CustomerController.patch
  );
  routes.delete(
    `/api/customers/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.MANAGER),
    CustomerController.delete
  );
};
