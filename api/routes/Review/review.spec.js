const supertest = require('supertest');
const cleaner = require('knex-cleaner');

const db = require('../../../data/db.config');
const server = require('../../server');

const books = '/api/books';

describe('Books', () => {
  beforeAll(() => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  beforeEach(async () => {
    // await cleaner.clean(db, {
    //   mode: 'truncate',
    //   ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
    // });
    await db('review').truncate();
  });

  it('should work', () => {
    expect(1).toBe(1);
  });
});
