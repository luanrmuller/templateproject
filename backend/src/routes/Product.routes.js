const ProductController = require("../controllers/registrations/ProductController");

module.exports = routes => {
  // POST ROUTES
  routes.get(`/api/post`, ProductController.getAll);
  routes.post(`/api/post`, ProductController.insert);
  routes.put(`/api/post/:id`, ProductController.update);
  routes.delete(`/api/post/:id`, ProductController.delete);
};
