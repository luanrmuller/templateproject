const Service = require("./Service");
const resp = require("../utils/ResponseUtils");

class UserService extends Service {
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

module.exports = UserService;
