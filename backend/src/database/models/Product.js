const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

class Product {
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

      return Joi.object({
        name: Joi.string()
          .min(1)
          .max(30)
          .required(),
        code: Joi.string()
          .min(1)
          .max(30)
          .required()
      }).validate(obj);
    };

    mongoose.model("Product", schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("Product");
  }
}

module.exports = Product;
