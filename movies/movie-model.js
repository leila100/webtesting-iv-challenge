const db = require("../data/dbConfig");

module.exports = {
  fetchAll,
  insert
};

async function fetchAll() {
  return db("movies");
}

function insert(movie) {
  return db("movies").insert(movie);
}
