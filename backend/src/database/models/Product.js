const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const ProductSchema = new mongoose.Schema({
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
  },
  note: {
    type: String,  
    trim: true
  }
});

ProductSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Product", ProductSchema);
