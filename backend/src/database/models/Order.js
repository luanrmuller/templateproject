const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

const schema = new mongoose.Schema({
  costumer: {
    type: String,
    required: true,
    minlength: 1,
    unique: true,
    trim: true
  },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }]
});

schema.plugin(uniqueValidator);
schema.plugin(beautifyUnique);

module.exports = mongoose.model("Order", schema);
