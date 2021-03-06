const ProductController = require("../controllers/registrations/ProductController");
const EPermissonLevel = require("../utils/EPermissionLevel");

module.exports = (router, permission) => {
  // POST ROUTES
  router.get(
    `/api/products`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.SALES_PERSON),
    ProductController.getAll
  );
  router.get(
    `/api/products/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.SALES_PERSON),
    ProductController.getById
  );
  router.get(
    `/api/productsCount`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.SALES_PERSON),
    ProductController.count
  );
  router.post(
    `/api/products`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.MANAGER),
    ProductController.insert
  );
  router.put(
    `/api/products/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.COORDINATOR),
    ProductController.update
  );
  router.patch(
    `/api/products/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.COORDINATOR),
    ProductController.patch
  );
  router.delete(
    `/api/products/:id`,
    permission.minimumPermissionLevelRequired(EPermissonLevel.MANAGER),
    ProductController.delete
  );
};
