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

  async insert(item) {
    try {
      let data = await this.model.create(item);
      if (data)
        // return {
        //   error: false,
        //   statusCode: 201,
        //   data
        // };
        return resp.success(data, 201);

      return resp.success(null, 500, "Not able to create item");
    } catch (error) {
      // return {
      //   error: true,
      //   statusCode: 500,
      //   message: error.errmsg || "Not able to create item",
      //   errors: error.errors
      // };
      return resp.error(
        error.errors,
        error.errmsg || "Not able to create item"
      );
    }
  }
}

module.exports = UserService;
