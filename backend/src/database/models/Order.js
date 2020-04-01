const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const OrderSchema = new mongoose.Schema({
  costumer: {
    type: String,
    required: true,
    minlength: 1,
    unique: true,
    trim: true
  },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }]
});

OrderSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Order", OrderSchema);
