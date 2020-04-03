const ProductController = require("../controllers/registrations/ProductController");
const EPermissonLevel = require("../utils/EPermissionLevel");

module.exports = (routes, permission) => {
  // POST ROUTES
  routes.get(
    `/api/products`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.SALES_PERSON),
    ProductController.getAll
  );
  routes.get(
    `/api/products/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.SALES_PERSON),
    ProductController.getById
  );
  routes.get(
    `/api/productsCount`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.SALES_PERSON),
    ProductController.count
  );
  routes.post(
    `/api/products`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.MANAGER),
    ProductController.insert
  );
  routes.put(
    `/api/products/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.COORDINATOR),
    ProductController.update
  );
  routes.patch(
    `/api/products/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.COORDINATOR),
    ProductController.patch
  );
  routes.delete(
    `/api/products/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.MANAGER),
    ProductController.delete
  );
};
