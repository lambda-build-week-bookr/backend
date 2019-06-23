const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

module.exports = table => ({
  add: add(table),
  get: get(table),
  update: update(table),
  remove: remove(table),
  cb,
});

const get = table => id => {
  if (!id) return db(table);
  return db(table).where({ id }).first();
}


const cb = (method) => {
  return method(db);
}

const add = table => (data) => {
  return db(table)
    .insert(data)
    .then(ids => {
      return get(table)(ids[0]);
    });
}

const update = table => (id, data) => {
  return db(table)
    .where({ id })
    .update(data)
    .then(() => {
      return get(table)(id);
    });
}

const remove = table => async (id) => {
  const record = await get(table)(id);
  await db(table)
    .where({ id })
    .del();
  return record;
};
