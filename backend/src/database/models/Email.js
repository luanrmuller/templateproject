const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

class Email {
  initSchema() {
    const schema = new mongoose.Schema({
      email: {
        type: String,
        required: true,
        minlength: 1,
        unique: "Two customers cannot share the same email ({VALUE})",
        trim: true,
      },
      isActive: {
        type: Boolean,
        default: false,
      },
      isDefault: {
        type: Boolean,
        default: false,
      },
    });

    schema.plugin(uniqueValidator);
    schema.plugin(beautifyUnique, {
      defaultMessage: "This custom message will be used as the default",
    });

    mongoose.model("Email", schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("Email");
  }

  joiValidate = function (obj) {
    const { Joi } = require("celebrate");

    return Joi.validate(obj, {
      email: Joi.types.String().min(1).max(30).required(),
    });
  };
}

module.exports = Email;