// ? Libs externas
//Controle de erros da api
const handleError = require("http-errors");
//Server express
const express = require("express");
//Autenticacao das rotas protegidas
const passport = require("passport");
//Validacao de parametros na rota
const celebrate = require("celebrate");
//Acesso externo
const cors = require("cors");
//GZIP da response
var compression = require("compression");

const helmet = require('helmet')

// ? Local
// Configura os erros para o retorno
const errorHandler = require("./middleware/HttpErrorsMiddleware");
const dontSniffMimetype = require("./middleware/DontSniffMimetype");
//rotas disponiveis na api
const routes = require("./routes/routes");

// ! Inicializacao da api
const app = express();

app.set("json spaces", 2);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// * Configura a conexao com o banco de dados
require("./database/database");

//---------------------------------------------------------------------------
// ! Helmet
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))

//---------------------------------------------------------------------------
// ! Cors
var corsOptions = {
  // origin: "http://localhost:5000",
  exposedHeaders: ["Location", "X-Total-Count"]
};

app.use(cors(corsOptions));

//---------------------------------------------------------------------------
// ! GZIP
app.use(compression({ filter: shouldCompress }));

function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}
//---------------------------------------------------------------------------
// ! passport
app.use(passport.initialize());
require("./config/auth")(passport);

//---------------------------------------------------------------------------
// ! Celebrate errors
app.use(celebrate.errors());

//---------------------------------------------------------------------------
// ! Routes
app.use(routes);

//---------------------------------------------------------------------------
// ! catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(handleError(404, "Not found", { code: 404 }));
});

//---------------------------------------------------------------------------
// ! error handler
app.use(errorHandler({ debug: true }));
app.use(dontSniffMimetype);

// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};
//   res.status(err.status || 500);
//   return res.status(404).json(err);
// });

module.exports = app;
