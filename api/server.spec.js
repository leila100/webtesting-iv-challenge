const request = require("supertest");

const server = require("./server.js");

describe("GET /", () => {
  it("should return status 200, json message Welcome to Movies API testing app", async () => {
    const res = await request(server).get("/");

    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body).toBe("Welcome to Movies API Testing App");
  });
});
