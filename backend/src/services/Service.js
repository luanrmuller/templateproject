var handleError = require("http-errors");
const mongoose = require("mongoose");
const resp = require("../utils/ResponseUtils");

class Service {
  constructor(model) {
    this.model = model;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.patch = this.patch.bind(this);
    this.delete = this.delete.bind(this);
    this.count = this.count.bind(this);
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

      // return resp.success(data, 200, "", count);
      return { statusCode: 200, data, count };
    } catch (err) {
      next(handleError(err));
    }
  }

  async getById(id, next) {
    try {
      let data = await this.model.findById(id).exec();
      if (!data) return { statusCode: 404, message: "Item not found" };

      return resp.success(data);
    } catch (err) {
      next(handleError(err));
    }
  }

  async insert(item, next) {
    try {
      let data = await this.model.create(item);
      if (!data) return { statusCode: 404, message: "Not able to create item" };

      return resp.success(data, 201);
    } catch (err) {
      next(handleError(err));
    }
  }

  async update(id, item, next) {
    try {
      const data = await this.model.findByIdAndUpdate(id, item, {
        new: true
      });
      if (!data) return resp.success(null, 404, "Item not found");

      return { statusCode: 202 };
    } catch (err) {
      next(handleError(err));
    }
  }

  async patch(id, item, next) {
    try {
      const data = await this.model.update(id, { $set: item });
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

      return res.json(null, 202, "", count);
    } catch (err) {
      next(handleError(err));
    }
  }
}

module.exports = Service;
