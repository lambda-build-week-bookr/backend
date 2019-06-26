const bcrypt = require('bcryptjs');

exports.seed = async (knex) => {
  await knex('user').insert([
    {
      username: 'admin',
      email: 'admin@bookr.com',
      password: bcrypt.hashSync('password', 10),
      role: 'admin',
    },
    {
      username: 'test',
      email: 'test@bookr.com',
      password: bcrypt.hashSync('test', 10),
      role: 'user',
    },
    {
      username: 'sunil123',
      email: 'sunil@gmail.com',
      password: bcrypt.hashSync('hello', 10),
      role: 'user',
    },
    {
      username: 'timi',
      email: 'timi@test.com',
      password: bcrypt.hashSync('timi', 10),
      role: 'user',
    },
  ]);
};
