var handleError = require("http-errors");

class Controller {
  constructor(service) {
    this.service = service;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.patch = this.patch.bind(this);
    this.delete = this.delete.bind(this);
    this.count = this.count.bind(this);
  }

  async getAll(req, res, next) {
    return retorno(req, res, next, await this.service.getAll(req.query, next));
  }

  async getById(req, res, next) {
    const { id } = req.params;
    return retorno(req, res, next, await this.service.getById(id));
  }

  async insert(req, res, next) {
    return retorno(req, res, next, await this.service.insert(req.body, next));
  }

  async update(req, res, next) {
    const { id } = req.params;
    return retorno(
      req,
      res,
      next,
      await this.service.update(id, req.body, next)
    );
  }

  async patch(req, res, next) {
    const { id } = req.params;
    return retorno(
      req,
      res,
      next,
      await this.service.patch(id, req.body, next)
    );
  }

  async delete(req, res, next) {
    const { id } = req.params;
    return retorno(req, res, next, await this.service.delete(id, next));
  }

  async count(req, res, next) {
    return retorno(req, res, next, await this.service.count(next));
  }
}

function retorno(req, res, next, response) {
  try {
    if (!response) {
      res.status(200);
      return res.send();
    }

    res.status(response.statusCode);

    if (response.message) {
      return res.json({ message: response.message });
    }

    if (response.count) {
      res.header("X-Total-Count", response.count);
    }

    const { location } = response;
    if (location) {
      const host = req.get("host");
      const { protocol, url } = req;
      res.header("Location", `${protocol}://${host}${url}/${location}`);
    }

    if (response.data) {
      if (req.headers.pretty) {
        return res.json(JSON.parse(response.data));
      }
      return res.json(response.data);
    }

    return res.send();
  } catch (err) {
    next(handleError(err));
  }
}

module.exports = Controller;
