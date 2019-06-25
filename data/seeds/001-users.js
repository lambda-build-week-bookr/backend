exports.seed = (knex, Promise) => {
  return knex('user').del()
    .then(() => {
      return knex('user').insert([
        {
          username: 'admin',
          email: 'admin@bookr.com',
          password: 'password',
        },
        {
          username: 'test',
          email: 'test@bookr.com',
          password: 'test',
        },
        {
          username: 'sunil123',
          email: 'sunil@gmail.com',
          password: 'hello',
        },
      ]);
    });
};
