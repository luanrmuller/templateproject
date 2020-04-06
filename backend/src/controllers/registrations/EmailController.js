const Controller = require("./Controller");
const EmailService = require("../../services/EmailService");
const Email = require("../../database/models/Email");
const productService = new EmailService(new Email().getInstance());

class EmailController extends Controller {
  constructor(service) {
    super(service);
  }
}

module.exports = new EmailController(productService);
