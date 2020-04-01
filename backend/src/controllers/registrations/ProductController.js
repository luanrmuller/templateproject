var handleError = require("http-errors");
const express = require("express");
const router = express.Router();

const Product = require("../../database/models/Product");
const ProductQuery = require("../../database/querys/ProdutoQuery");

router.options("", (request, response) => {
  response.header("Allow", "GET, POST, PUT, DELETE");
});

// ! Return all Products
/**
 * Example
 * URL: http://hostname:port/api/products?page=1&pageSize=10
 * BODY :
 * {
 *	"fields" : "db_columnName1",
 *	"filters" : [
 *		{"db_columnName1" : ["name1", "name2"]},
 *		{"db_columnName2": ["code1","code2"]}
 *	],
 *  "sort" : "db_columnName2"
 * }
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
