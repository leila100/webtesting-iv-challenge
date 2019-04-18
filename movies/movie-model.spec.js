const db = require("../data/dbConfig.js");

const Movies = require("./movie-model.js");

describe("movie-model", () => {
  beforeEach(async () => {
    await db("movies").truncate();
  });

  describe("fetchAll()", () => {
    it("Should return an array", async () => {
      const movies = await Movies.fetchAll();
      expect(movies).toBeInstanceOf(Array);
    });
  });
});
