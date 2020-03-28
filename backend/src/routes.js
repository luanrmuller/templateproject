const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const SignInController = require("./controllers/SignInController");
const SignUpController = require("./controllers/SignUpController");
const PageNotFoundController = require("./controllers/PageNotFoundController");
const DashboardController = require("./controllers/DashboardController");

const routes = express.Router();

routes.get(
  "/",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      //   authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      //   title: Joi.string().required(),
    })
  }),
  (request, response) => {
    return response.json({ availableRoute: "/dashboard" });
  }
);

routes.get("/dashboard", DashboardController.index);

module.exports = routes;
