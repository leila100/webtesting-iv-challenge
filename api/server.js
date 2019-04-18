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
  const [movieId] = await Movies.insert(req.body);
  res.status(201).json(movieId);
});

module.exports = server;
