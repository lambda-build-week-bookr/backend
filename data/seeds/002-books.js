exports.seed = async (knex) => {

  // Insert Authors
  await knex('author').insert([
    {
      name: 'Author Name',
    }
  ]);
  
  // Insert Publishers
  await knex('publisher').insert([
    {
      name: 'Publisher Name'
    }
  ]);
};
