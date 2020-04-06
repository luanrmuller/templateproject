const CustomerController = require("../controllers/registrations/CustomerController");
const EPermissonLevel = require("../utils/EPermissionLevel");

module.exports = (router, permission) => {
  // * No authenticated router
  router.post(`/login`, CustomerController.login);
  router.post(`/signup`, CustomerController.signup);

  // * Authenticated router
  router.get(
    `/api/customers`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.SALES_PERSON),
    CustomerController.getAll
  );
  router.get(
    `/api/customers/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.SALES_PERSON),
    CustomerController.getById
  );
  router.get(
    `/api/customersCount`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.SALES_PERSON),
    CustomerController.count
  );
  router.post(
    `/api/customers`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.MANAGER),
    CustomerController.insert
  );
  router.put(
    `/api/customers/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.COORDINATOR),
    CustomerController.update
  );
  router.patch(
    `/api/customers/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.COORDINATOR),
    CustomerController.patch
  );
  router.delete(
    `/api/customers/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.MANAGER),
    CustomerController.delete
  );
};
