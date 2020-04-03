const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

class Customer {
  initSchema() {
    const schema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 1,
        unique: true,
        trim: true
      },
      code: {
        type: String,
        required: true,
        minlength: 1,
        unique: true,
        trim: true
      }
    });

    schema.plugin(uniqueValidator);
    schema.plugin(beautifyUnique);
    schema.statics.joiValidate = function(obj) {
      const { Joi } = require("celebrate");

      var schemaValidator = {
        name: Joi.types
          .String()
          .min(1)
          .max(30)
          .required(),
        code: Joi.types
          .String()
          .min(1)
          .max(30)
          .required()
      };

      return Joi.validate(obj, schemaValidator);
    };

    mongoose.model("Customer", schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("Customer");
  }
}

module.exports = Customer;
