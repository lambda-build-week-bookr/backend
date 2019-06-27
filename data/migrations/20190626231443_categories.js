exports.up = (knex) => {
  return knex.schema
    .createTable('category', table => {
      table.increments();
      table.string('name')
        .unique()
        .notNullable();
    })
    .createTable('book_category', table => {
      table.increments();
      table.integer('book_id')
        .notNullable()
        .references('id')
        .inTable('book')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      table.integer('category_id')
        .notNullable()
        .references('id')
        .inTable('category')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    });
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('book_category')
    .dropTableIfExists('category');
};
