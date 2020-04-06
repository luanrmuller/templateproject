const Controller = require("./Controller");
const CustomerService = require("../../services/CustomerService");
const Customer = require("../../database/models/Customer");
const costumerService = new CustomerService(new Customer().getInstance());

class CustomerController extends Controller {
  constructor(service) {
    super(service);
  }

  
  async login(req, res, next) {
    const errors = {};
    const { login, password } = req.body;

    let customer = undefined;
    if (login) {
      customer = await customerService.findOneByLoginWithPassword(login);
    }

    // return if there was no customer with this customername found in the database
    if (!customer) {
      errors.message = "No Account Found";
      return res.status(400).json(errors);
    }

    let isMatch = await bcrypt.compare(password, customer.password);

    // return 400 if password does not match
    if (!isMatch) {
      errors.message = "Password is incorrect";
      return res.status(400).json(errors);
    }

    const payload = {
      id: customer._id,
      customername: customer.customername
    };

    const token = await jwt.sign(payload, secret, { expiresIn: 36000 });

    // return 500 if token is incorrect
    if (!token) {
      return res.status(500).json({ error: "Error signing token", raw: err });
    }

    return res.json({
      success: true,
      token: `Bearer ${token}`
    });
  }

  signup(req, res, next) {
    const { name, login, password, permissionLevel } = req.body;

    var errors = {};
    const customer = customerService.findOneByLoginWithPassword(req.body.login);

    if (customer) {
      // return res.status(400).json({});
      next(handleError("Customer not exists"));
    }

    try {
      const newCustomer = new Customer({ name, login, password, permissionLevel });
      customerService.validate(newCustomer);

      customerService.insert(newCustomer);

      return res.status(200).json({});
    } catch (err) {
      // errors = e;
      // return res.status(400).json(e);
      next(handleError(err));
    }
  }

  async findOneByLoginWithPassword(login) {
    return await customerService.findOneByLoginWithPassword(login);
  }

  async findById(id) {
    return await customerService.findById(id);
  }

  async updatepassword(req, res, next) {
    const login = req.customer.login;
    const oldPassword = req.body.oldpassword;
    const newPassword = req.body.password;

    const dbCustomer = await customerService.findOneWithPassword(login);

    const passwordMatch = await new Promise((resolve, reject) => {
      bcrypt.compare(oldPassword, dbCustomer.password, function(err, isMatch) {
        console.log(err);

        if (err) return reject(err);
        resolve(isMatch);
      });
    });
    if (!passwordMatch) {
      return res.status(400).json({ message: "Old password incorrect." });
    }

    console.log(dbCustomer);
    dbCustomer.password = newPassword;
    console.log(dbCustomer.password);
    try {
      await dbCustomer.save();
    } catch (e) {
      return res.status(400).json(e);
    }
    res.status(200).json();
  }
}

module.exports = new CustomerController(costumerService);
