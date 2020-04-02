const http = require("http");

const errorHandler = (opts = {}) => (err, req, res, next) => {
  if (opts.debug) {
    console.error(err);
  }

  const statusCode = err.status || err.statusCode || 500;

  let errors = undefined;
  if (err.errors) {
    errors = Object.values(err.errors);
    errors.forEach(element => {
      delete element["properties"];
    });
  }

  res.status(statusCode).json({
    error: {
      title: http.STATUS_CODES[statusCode],
      name: err.name,
      message: err._message || err.message,
      errors
    }
  });
  return next();
};

module.exports = errorHandler;
