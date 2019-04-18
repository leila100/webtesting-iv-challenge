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

describe("POST /movies", () => {
  it("should add movie to the database", async () => {
    const movieData = {
      title: "Shazam!",
      description: "A boy is given the ability to become an adult superhero in times of need with a single magic word."
    };
    const res = await request(server)
      .post("/movies")
      .send(movieData)
      .set("Accept", "application/json");
    expect(res.status).toBe(201);
    expect(res.type).toBe("application/json");

    const movie = await db("movies")
      .where({ id: res.body })
      .first();
    expect(movie.title).toBe("Shazam!");
  });
});

describe("POST /movies/:id", () => {
  it("should delete the movie with id", async () => {
    await db("movies").insert({
      title: "Shazam!",
      description: "A boy is given the ability to become an adult superhero in times of need with a single magic word."
    });
    await db("movies").insert({
      title: "Captain Marvel",
      description:
        "The story follows Carol Danvers as she becomes one of the universe’s most powerful heroes when Earth is caught in the middle of a galactic war between two alien races. Set in the 1990s, Captain Marvel is an all-new adventure from a previously unseen period in the history of the Marvel Cinematic Universe."
    });
    const id = 1;
    // delete first movie
    const res = await request(server).delete(`/movies/${id}`);
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body).toBe(1);
    // The database should only have one movie left
    const movies = await db("movies");
    expect(movies.length).toBe(1);
    expect(movies[0].title).toBe("Captain Marvel");
  });
});
