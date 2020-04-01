var handleError = require("http-errors");
const express = require("express");
const router = express.Router();

const Product = require("../../database/models/Product");
const ProductQuery = require("../../database/querys/ProdutoQuery");

// ! Return all Products
/**
 * @api {get} /api/products?page=1&pageSize=10&fields=name code&filters[eq]=name:prod&sort=code
 * @apiName Products
 * @apiGroup Product
 *
 * @apiHeader (Headers) {String} authorization Authorization value.
 *
 * @apiParam {Number} page Value of offset ex: 1.
 * @apiParam {Number} pageSize Value of limit ex: 1.
 * @apiParam {String} fields Filds on response ex: name code.
 * @apiParam {String[]} filters List of filters ex: name:prod.
 * @apiParam {String} Sort Sort order of list ex: code.
 *
 * @apiSuccess  {Object[]} products List of products.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {"code": "1234","name": "prod 1" },
 *       {"code": "1235","name": "prod 2" }
 *     ]
 */
router.get("/", async (request, response) => {
  const { page = 1, pageSize = 5 } = request.query;
  const { fields = {}, filters = [], sort = {} } = request.query;

  try {
    const count = await ProductQuery.countDocuments();
    response.header("X-Total-Count", count);

    const products = await ProductQuery.list(
      filters,
      fields,
      page,
      pageSize,
      sort
    );

    return response.json(products);
  } catch (error) {
    handleError(error);
  }
});

// ! Return Product by id
router.get("/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const result = await ProductQuery.findById(id);

    return response.json(result);
  } catch (error) {
    handleError(error);
  }
});

// ! Create a new Product and return a new id
router.post("/", async (request, response) => {
  try {
    var id = await ProductQuery.save(request.body);

    return response.json({ id });
  } catch (error) {
    handleError(error);
  }
});

// ! Update a Product by id
router.put("/:id", async (request, response) => {
  const { id } = request.params;
  try {
    await ProductQuery.update(id, request.body);

    return response.json({ id });
  } catch (error) {
    handleError(error);
  }
});

// ! Remove a Product by id
router.delete("/:id", async (request, response) => {
  const { id } = request.params;
  try {
    await ProductQuery.deleteOne(id);

    return response.status(204).send();
  } catch (error) {
    handleError(error);
  }
});

module.exports = router;
