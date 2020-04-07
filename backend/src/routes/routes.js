const express = require("express");
const passport = require("passport");
const { celebrate, Segments, Joi } = require("celebrate");
const permissionMiddleware = require("../middleware/PermissionMiddleware");

const DashboardRoutes = require("./Dashboard.routes");

// ? registrations
const CostumerRoutes = require("./customer.routes");
const ProductRoutes = require("./product.routes");
const UserRoutes = require("./User.routes");
const EmailRoutes = require("./Email.routes");

// ? Orders
// const OrderRoutes = require("../controllers/OrderRoutes");

const router = express.Router();

// * No authenticated router
router.get("/", (req, res) => {
  return res.json({ message: "¯\_(ツ)_/¯" });
});

router.all(
  "/api/*",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  passport.authenticate("jwt", { session: false })
);

// * Authenticated router
//-----------------------------------------------------------------------------
// ! Initial router
DashboardRoutes(router);

// ! registrations
UserRoutes(router, permissionMiddleware);
CostumerRoutes(router, permissionMiddleware);
ProductRoutes(router, permissionMiddleware);
EmailRoutes(router, permissionMiddleware);

// ! Orders
// router.use("/api/orders", OrderRoutes);

// TODO: other router here....

//-----------------------------------------------------------------------------

module.exports = router;
