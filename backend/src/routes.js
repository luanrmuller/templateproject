const express = require("express");
const passport = require("passport");
const { celebrate, Segments, Joi } = require("celebrate");

const SignInController = require("./controllers/SignInController");
const SignUpController = require("./controllers/SignUpController");
const DashboardController = require("./controllers/DashboardController");

// ? registrations
const CostumerController = require("./controllers/registrations/CostumerController");
const ProductController = require("./controllers/registrations/ProductController");
const UserController = require("./controllers/registrations/UserController");

// ? Orders
const OrderController = require("./controllers/OrderController");

const router = express.Router();

// * No authenticated router
router.use("/login", SignInController);

router.all(
  "/api/*",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  passport.authenticate("jwt", { session: false })
);

// Authenticated router
//-----------------------------------------------------------------------------
// ! Initial router
router.use("/api/signup", SignUpController);
router.use("/api/dashboard", DashboardController);

// ! registrations
router.use("/api/users", UserController);
router.use("/api/costomers", CostumerController);
router.use("/api/products", ProductController);

// ! Orders
// router.use("/api/orders", OrderController);

// TODO: other router here....

//-----------------------------------------------------------------------------

module.exports = router;
