const db = require("../data/dbConfig");

module.exports = {
  fetchAll,
  insert
};

async function fetchAll() {
  return db("movies");
}

async function insert(movie) {
  return db("movies").insert(movie);
  // const [id] = await db("movies").insert(movie);
  // return db("movies")
  //   .where({ id })
  //   .first();
}
