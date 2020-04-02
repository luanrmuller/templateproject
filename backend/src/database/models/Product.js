const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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

    // ProductSchema.plugin(uniqueValidator);

    schema.plugin(uniqueValidator);
    mongoose.model("Product", schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("Product");
  }
}

module.exports = Product;
