const request = require("supertest");
const app = require("../../src/app");

const mongoose = require("mongoose");
const databaseName = "test";

const Product = require("../../src/database/models/Product");

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/${databaseName}`;
  await mongoose.connect(url, { useNewUrlParser: true });
});

describe("Products", () => {
  beforeEach(async () => {
    // Cleans up database between each test
    await Product.deleteMany();
  });

  afterEach(async () => {});

  it("Should save product to database", async () => {
    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODIyZGEzOTQ5Nzc5MWRmNDAzYjIxOCIsImlhdCI6MTU4NTY4NjY5MiwiZXhwIjoxNTg1NzIyNjkyfQ.iEZEGZAuAJZKe16YBsJWdSfASG3zmx6ItzgGbhezs7s";

    const response = await request(app)
      .post("/api/products")
      .set("Authorization", token)
      .send({ name: "produto", code: "1234" });

    //console.log(response);
    expect(response.body).toBeTruthy();
    // expect(response.body.id).toHaveLength(24);
  });
});
