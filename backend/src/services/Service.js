const mongoose = require("mongoose");
const resp = require("../utils/ResponseUtils");

class Service {
  constructor(model) {
    this.model = model;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.count = this.count.bind(this);
  }

  async getAll(query) {
    let { page = 1, pageSize = 5, fields = {}, sort = {} } = query;

    page = page ? Number(page) : 0;
    pageSize = pageSize ? Number(pageSize) : 10;

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
      let data = await this.model
        .find(query, fields)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort(sort);
      let count = await this.model.countDocuments();

      // return {
      //   error: false,
      //   statusCode: 200,
      //   data,
      //   count
      // };
      return resp.success(data, 200, "", count);
    } catch (errors) {
      // return {
      //   error: true,
      //   statusCode: 500,
      //   errors
      // };
      return resp.error(errors);
    }
  }

  async getById(id) {
    try {
      let data = await this.model.findById(id).exec();

      // return {
      //   error: false,
      //   statusCode: 200,
      //   data
      // };
      return resp.success(data);
    } catch (errors) {
      // return {
      //   error: true,
      //   statusCode: 500,
      //   errors
      // };
      return resp.error(errors);
    }
  }

  async insert(item) {
    try {
      let data = await this.model.create(item);
      if (data)
        // return {
        //   error: false,
        //   statusCode: 201,
        //   data
        // };
        return resp.success(data, 201);

      return resp.success(null, 500, "Not able to create item");
    } catch (error) {
      // return {
      //   error: true,
      //   statusCode: 500,
      //   message: error.errmsg || "Not able to create item",
      //   errors: error.errors
      // };
      return resp.error(
        error.errors,
        error.errmsg || "Not able to create item"
      );
    }
  }

  async update(id, item) {
    try {
      await this.model.findByIdAndUpdate(id, item, { new: true });
      // return {
      //   error: false,
      //   statusCode: 202,
      //   data: id
      // };
      return resp.success(id, 202);
    } catch (errors) {
      // return {
      //   error: true,
      //   statusCode: 500,
      //   errors
      // };
      return resp.error(errors);
    }
  }

  async delete(id) {
    try {
      let data = await this.model.findByIdAndDelete(id);
      if (!data)
        // return {
        //   error: true,
        //   statusCode: 404,
        //   message: "item not found"
        // };
        return resp.success(id, 404, "Item not found");

      // return {
      //   error: false,
      //   deleted: true,
      //   statusCode: 202
      // };
      return resp.success(null, 202);
    } catch (errors) {
      // return {
      //   error: true,
      //   statusCode: 500,
      //   errors
      // };
      return resp.error(errors);
    }
  }

  async count() {
    try {
      let data = await this.model.countDocuments();

      // return {
      //   error: false,
      //   statusCode: 202,
      //   data
      // };
      return res.json(data, 202);
    } catch (errors) {
      // return {
      //   error: true,
      //   statusCode: 500,
      //   errors
      // };
      return resp.error(errors);
    }
  }
}

module.exports = Service;
