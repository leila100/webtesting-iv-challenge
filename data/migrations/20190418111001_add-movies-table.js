exports.up = function(knex, Promise) {
  return knex.schema.createTable("movies", tbl => {
    tbl.increments();

    tbl.string("title", 255).notNullable();
    tbl.string("description", 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  // undo the operation in up
  return knex.schema.dropTableIfExists("movies");
};
