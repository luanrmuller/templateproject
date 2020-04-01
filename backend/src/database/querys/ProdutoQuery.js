const Product = require("../../database/models/Product");

module.exports = {
  async countDocuments() {
    return await Product.countDocuments({});
  },

  async list(filters, fields, page, pageSize, sort) {
    return await Product.find(filters[0], fields)
      .skip((page - 1) * pageSize)
      .limit(pageSize * 1)
      .sort(sort)
      .exec();
  },

  async findById(id) {
    return await Product.findById(id).exec();
  },

  async save(data) {
    const { name, code } = data;
    var product = new Product({ name, code });

    var { id } = await product.save();

    return id;
  },

  async update(id, data) {
    const product = await Product.findById(id).exec();
    product.set(data);

    return await product.save();
  },

  async deleteOne(id) {
    return await Product.deleteOne({ _id: id }).exec();
  }
};
