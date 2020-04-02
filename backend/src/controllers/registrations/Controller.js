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
    return retorno(res, await this.service.getAll(req.query, next));
  }

  async getById(req, res) {
    const { id } = req.params;
    return retorno(res, await this.service.getById(id));
  }

  async insert(req, res, next) {
    return retorno(res, await this.service.insert(req.body, next));
  }

  async update(req, res, next) {
    const { id } = req.params;
    return retorno(res, await this.service.update(id, req.body, next));
  }

  async patch(req, res, next) {
    const { id } = req.params;
    return retorno(res, await this.service.patch(id, req.body, next));
  }

  async delete(req, res, next) {
    const { id } = req.params;
    return retorno(res, await this.service.delete(id, next));
  }

  async count(req, res, next) {
    return retorno(res, await this.service.count(next));
  }
}

function retorno(res, response) {
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

  if (response.data) {
    return res.json(response.data);
  }

  return res.send();
}

module.exports = Controller;
