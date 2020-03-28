const request = require("supertest");
const app = require("../../src/app");

describe("Dashboard", () => {
  beforeEach(async () => {});

  afterEach(async () => {});

  it("should be able to return msg value", async () => {
    const response = await request(app)
      .post("/dashboard")
      .send({});

    expect(response.body).toHaveProperty("msg");
    expect(response.body.msg).toHaveLength(12);
  });
});
