module.exports = {
  //Respostas de sucesso (200-299)
  success(data, statusCode, msg, count) {
    const code = statusCode ? statusCode : 200;
    const message = msg ? msg : "";
    return {
      code,
      message,
      data,
      count
    };
  },

  error(errors, msg, statusCode) {
    const code = statusCode ? statusCode : 500;
    const message = msg ? msg : "";
    return {
      error: true,
      code,
      message,
      errors
    };
  }
};
