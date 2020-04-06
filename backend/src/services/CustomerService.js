const Service = require("./Service");

class CustomerService extends Service {
  constructor(model) {
    super(model);
  }

  async findOneByLoginWithPassword(login) {
    return await this.model.findOne({ login }).select("+password");
  }

  async findById(id) {
    return await this.model.findById(id);
  }
}

module.exports = CustomerService;
