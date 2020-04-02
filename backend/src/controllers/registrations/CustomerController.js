const Controller = require( "./Controller");
const CustomerService = require( "../../services/CustomerService");
const Customer = require( "../../database/models/Customer");
const costumerService = new CustomerService(new Customer().getInstance());

class CustomerController extends Controller {
  constructor(service) {
    super(service);
  }
}

module.exports = new CustomerController(costumerService);
