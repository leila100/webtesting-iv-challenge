const db = require("../data/dbConfig");

module.exports = {
  fetchAll,
  insert,
  remove
};

async function fetchAll() {
  return db("movies");
}

function insert(movie) {
  return db("movies").insert(movie);
}

function remove(id) {
  return db("movies")
    .where({ id })
    .del();
}
