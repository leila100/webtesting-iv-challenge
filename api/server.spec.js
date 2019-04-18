const request = require("supertest");

const server = require("./server.js");
const db = require("../data/dbConfig");

beforeEach(async () => {
  await db("movies").truncate(); // reset the database before test
});

describe("GET /", () => {
  it("should return status 200, json message Welcome to Movies API testing app", async () => {
    const res = await request(server).get("/");

    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body).toBe("Welcome to Movies API Testing App");
  });
});

describe("GET /movies", () => {
  it("should return status 200, json array of movies", async () => {
    const res = await request(server).get("/movies");

    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body).toBeInstanceOf(Array);
  });
});
