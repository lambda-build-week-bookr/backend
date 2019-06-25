const bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) => {
  return knex('user').del()
    .then(() => {
      return knex('user').insert([
        {
          username: 'admin',
          email: 'admin@bookr.com',
          password: bcrypt.hashSync('password', 10),
        },
        {
          username: 'test',
          email: 'test@bookr.com',
          password: bcrypt.hashSync('test', 10),
        },
        {
          username: 'sunil123',
          email: 'sunil@gmail.com',
          password: bcrypt.hashSync('hello', 10),
        },
      ]);
    });
};
