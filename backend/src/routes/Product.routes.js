const ProductController = require("../controllers/registrations/ProductController");
const EPermissonLevel = require("../utils/EPermissionLevel");

module.exports = (routes, permissionMiddleware) => {
  // POST ROUTES
  routes.get(
    `/api/products`,
    permissionMiddleware.minimumPermissionLevelRequired(
      EPermissonLevel.COORDINATOR.getValue()
    ),
    ProductController.getAll
  );
  routes.get    (`/api/products/:id`,   ProductController.getById);
  routes.post   (`/api/products`,       ProductController.insert);
  routes.put    (`/api/products/:id`,   ProductController.update);
  routes.delete (`/api/products/:id`,   ProductController.delete);
  routes.options(`/api/products/count`, ProductController.count);
};
