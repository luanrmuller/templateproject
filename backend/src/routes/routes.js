const express = require("express");
const passport = require("passport");
const { celebrate, Segments, Joi } = require("celebrate");
const permissionMiddleware = require("../middleware/PermissionMiddleware");

const DashboardController = require("../controllers/DashboardController");

// ? registrations
const CostumerController = require("./customer.routes");
const ProductRoutes = require("./product.routes");
const UserController = require("./User.routes");

// ? Orders
const OrderController = require("../controllers/OrderController");

const router = express.Router();

// * No authenticated router
router.get("/", (req, res) => {
  return res.json({ message: "¯_(ツ)_/¯" });
});

router.all(
  "/api/*",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  passport.authenticate("jwt", { session: false })
);

// * Authenticated router
//-----------------------------------------------------------------------------
// ! Initial router
// router.use("/signup", SignUpController);
router.use("/api/dashboard", DashboardController);

// ! registrations
UserController(router, permissionMiddleware);
CostumerController(router, permissionMiddleware);
ProductRoutes(router, permissionMiddleware);

// ! Orders
// router.use("/api/orders", OrderController);

// TODO: other router here....

//-----------------------------------------------------------------------------

module.exports = router;
