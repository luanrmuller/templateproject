class Controller {
  constructor(service) {
    this.service = service;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.count = this.count.bind(this);
  }

  async getAll(req, res) {
    return retorno(res, await this.service.getAll(req.query));
  }

  async getById(req, res) {
    const { id } = req.params;
    return retorno(res, await this.service.getById(id));
  }

  async insert(req, res) {
    return retorno(res, await this.service.insert(req.body));
  }

  async update(req, res) {
    const { id } = req.params;

    return retorno(res, await this.service.update(id, req.body));
  }

  async delete(req, res) {
    const { id } = req.params;

    return retorno(res, await this.service.delete(id));
  }

  async count(req, res) {
    return retorno(res, await this.service.count());
  }
}

function retorno(res, response) {
  res.status(response.code);
  if (response.error) {
    return res.json({ message: response.message, errors: response.errors });
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
