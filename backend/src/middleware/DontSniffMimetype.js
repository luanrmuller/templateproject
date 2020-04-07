/** @param { import('express').Express} app */
module.exports = (app) => {
  app.use((_, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    return next();
  });
};
