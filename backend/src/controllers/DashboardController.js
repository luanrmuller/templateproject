const express = require("express");

const router = express.Router();

router.get("/", (request, response) => {
  return response.json({ msg: "Hello world from backend!" });
});

router.get("/modules", (request, response) => {
  const modules = [
    "Clientes",
    "Vendas",
    "Cadastros",
    "Atendimento",
    "Agendamento",
    "Outros"
  ];

  return response.json(modules);
});

module.exports = router;
