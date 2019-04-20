const express = require("express");

const Movies = require("../movies/movie-model");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json("Welcome to Movies API Testing App");
});

server.get("/movies", async (req, res) => {
  const movies = await Movies.fetchAll();
  res.status(200).json(movies);
});

server.post("/movies", async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400).json("Please provide a title and a description for the movie.");
  } else {
    const [movieId] = await Movies.insert(req.body);
    res.status(201).json(movieId);
  }
});

server.delete("/movies/:id", async (req, res) => {
  const { id } = req.params;

  const count = await Movies.remove(id);
  if (count === 0) {
    res.status(404).json("Movie with this id doesn't exist");
  } else {
    res.status(200).json(count);
  }
});

module.exports = server;
