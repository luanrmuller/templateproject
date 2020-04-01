const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const CostumerSchema = new mongoose.Schema({
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

CostumerSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Costumer", CostumerSchema);
