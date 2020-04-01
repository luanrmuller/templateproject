const express = require("express");
const router = express.Router();

// ! Return all Costumers
router.get("/", (request, response) => {
  return response.json([]);
});

// ! Return Costumer by id
router.get("/:id", (request, response) => {
  const id = request.params("id");
  return response.json({});
});

// ! Create a new Costumer and return a new id
router.post("/", (request, response) => {
  const id = "";
  return response.json({ id });
});

// ! Update a Costumer by id
router.put("/:id", (request, response) => {
  const id = request.params("id");

  return response.json({ id });
});

// ! Remove a Costumer by id
router.delete("/:id", (request, response) => {
  const id = request.params("id");

  return response.json({ id });
});

module.exports = router;
