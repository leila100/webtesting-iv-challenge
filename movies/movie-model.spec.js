const db = require("../data/dbConfig.js");

const Movies = require("./movie-model.js");

describe("movie-model", () => {
  beforeEach(async () => {
    await db("movies").truncate();
  });

  describe("fetchAll()", () => {
    it("Should return an empty array", async () => {
      const movies = await Movies.fetchAll();
      expect(movies).toHaveLength(0);
      expect(movies).toEqual([]);
    });
  });

  describe("insert()", () => {
    it("should insert a new movie into the database", async () => {
      let [id] = await Movies.insert({
        title: "Shazam!",
        description:
          "A boy is given the ability to become an adult superhero in times of need with a single magic word."
      });
      let movie = await db("movies")
        .where({ id })
        .first();
      expect(movie.title).toBe("Shazam!");

      [id] = await Movies.insert({
        title: "Captain Marvel",
        description:
          "The story follows Carol Danvers as she becomes one of the universe’s most powerful heroes when Earth is caught in the middle of a galactic war between two alien races. Set in the 1990s, Captain Marvel is an all-new adventure from a previously unseen period in the history of the Marvel Cinematic Universe."
      });
      movie = await db("movies")
        .where({ id })
        .first();
      expect(movie.title).toBe("Captain Marvel");

      const movies = await db("movies");
      expect(movies).toHaveLength(2);
    });
  });
});
