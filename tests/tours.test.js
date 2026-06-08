const request = require("supertest");
const app = require("../app"); // IMPORTANT (you must create app.js)

describe("Tours API", () => {
  test("GET /api/tours should return 200", async () => {
    const res = await request(app).get("/api/tours");
    expect(res.statusCode).toBe(200);
  });
});