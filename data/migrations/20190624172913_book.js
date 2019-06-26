exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('publisher', table => {
      table.increments();
      table.string('name')
        .notNullable();
    })
    .createTable('book', table => {
      table.increments();
      table.string('title')
        .notNullable();
      table.string('isbn')
        .notNullable();
      table.string('cover')
        .notNullable();
      table.string('edition')
      table.string('thumbnail')
      table.text('description')
        .notNullable();
      table.integer('publisher_id')
        .notNullable()
        .references('id')
        .inTable('publisher')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    })
    .createTable('author', table => {
      table.increments();
      table.string('name')
        .notNullable();
    })
    .createTable('book_author', table => {
      table.increments();
      table.integer('book_id')
        .notNullable()
        .references('id')
        .inTable('book')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      table.integer('author_id')
        .notNullable()
        .references('id')
        .inTable('author')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    })
    .createTable('review', table => {
      table.increments();
      table.text('review')
      table.float('rating')
        .notNullable();
      table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('user')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      table.integer('book_id')
        .notNullable()
        .references('id')
        .inTable('book')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      table.unique(['user_id', 'book_id']);
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTableIfExists('review')
  .dropTableIfExists('book_author')
  .dropTableIfExists('author')
  .dropTableIfExists('book')
  .dropTableIfExists('publisher');
};
