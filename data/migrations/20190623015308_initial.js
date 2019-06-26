exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('user', table => {
      table.increments();
      table.string('email', 128)
        .unique()
        .notNullable();
      table.string('username', 128)
        .unique()
        .notNullable();
      table.string('role')
        .notNullable();
      table.string('password', 256)
        .notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('role');
};
