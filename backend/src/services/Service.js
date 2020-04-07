var handleError = require("http-errors");
const mongoose = require("mongoose"); 

class Service {
  constructor(model) {
    this.model = model;
    this.validate = this.validate.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.patch = this.patch.bind(this);
    this.delete = this.delete.bind(this);
    this.count = this.count.bind(this);
  }

  async validate(item, next) {
    try {
      if (typeof this.model.joiValidate === "function") {
        return await this.model.joiValidate(item);
      }
    } catch (err) {
      next(handleError(err));
    }
  }

  async getAll(query, next) {
    let { page = 1, pageSize = 5, fields = {}, sort = {} } = query;

    page = page ? Number(page) : 0;
    pageSize = pageSize ? Number(pageSize) : 10;
    // Max page size is 50
    pageSize = pageSize <= 50 ? pageSize : 10;

    delete query.page;
    delete query.pageSize;
    delete query.fields;
    delete query.sort;

    if (query._id) {
      try {
        query._id = new mongoose.mongo.ObjectId(query._id);
      } catch (error) {
        console.log(error);
        console.log("not able to generate mongoose id with content", query._id);
      }
    }

    try {
      let count = await this.model.countDocuments();
      let data = await this.model
        .find(query, fields)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort(sort);

      return { statusCode: 200, data, count };
    } catch (err) {
      next(handleError(err));
    }
  }

  async getById(id, next) {
    try {
      let data = await this.model.findById(id);
      if (!data) return { statusCode: 404, message: "Item not found" };

      return { statusCode: 200, data };
    } catch (err) {
      console.log(err);
      next(handleError(err));
    }
  }

  async insert(item, next) {
    try {
      if (typeof this.model.joiValidate === "function") {
        await this.model.joiValidate(item);
      }

      let data = await this.model.create(item);
      if (!data) return { statusCode: 404, message: "Not able to create item" };

      const location = `/${data.id}`;
      return { statusCode: 201, data, location };
    } catch (err) {
      next(handleError(err));
    }
  }

  async update(id, item, next) {
    try {
      const data = await this.model.findByIdAndUpdate(id, item, {
        new: true
      });
      if (!data) return  { statusCode: 404, message:"Item not found"};

      return { statusCode: 202 };
    } catch (err) {
      next(handleError(err));
    }
  }

  async patch(id, item, next) {
    try {
      const data = await this.model.update({ _id: id }, { $set: item });
      if (!data) return { statusCode: 404, message: "Item not found" };

      return { statusCode: 202 };
    } catch (err) {
      next(handleError(err));
    }
  }

  async delete(id, next) {
    try {
      let data = await this.model.findByIdAndDelete(id);
      if (!data) return { statusCode: 404, message: "Item not found" };

      return { statusCode: 202 };
    } catch (err) {
      next(handleError(err));
    }
  }

  async count(next) {
    try {
      let count = await this.model.countDocuments();
      if (!count) return { statusCode: 500 };

      return { statusCode: 202, count };
    } catch (err) {
      next(handleError(err));
    }
  }
}

module.exports = Service;
