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
      table.string('password', 256)
        .notNullable();
    })
    .createTable('role', table => {
      table.increments();
      table.string('role', 128)
        .unique()
        .notNullable();
    })
    .createTable('user_role', table => {
      table.increments();
      table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('user')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      table.integer('role_id')
        .notNullable()
        .references('id')
        .inTable('role')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('user_role')
    .dropTableIfExists('user')
    .dropTableIfExists('role');
};
