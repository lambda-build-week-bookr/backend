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
    // await db('books').truncate();
  });

  it('should work', () => {
    expect(1).toBe(1);
  })
  describe('GET /', () => {
    it('should handle no authorization header / 400', async () => {
      const request = await supertest(server)
        .get(books)
        .expect(400);
      
      expect(request.body).toEqual({
        status: 'error',
        error: 'MissingAuth',
        message: 'Please provide a token in the `Authorization` header.',
      });
    });

    it('should handle invalid authorization header / 401', async () => {
      const request = await supertest(server)
        .get(books)
        .set('Authorization', '1337h4x0r')
        .expect(401);

      expect(request.body).toEqual({
        status: 'error',
        error: 'InvalidCreds',
        message: 'Invalid/Expired authorization token provided.',
      });
    })

    it('should return a list of books / 200', async () => {
      // register for this request
      const { body: { user: { token } } } = await supertest(server)
        .post('/api/auth/register')
        .send({
          email: 'admin@bookr.com',
          username: 'admin',
          password: 'password',
        })
        .expect(201);

      const request = await supertest(server)
        .get(books)
        .set('Authorization', token)
        .expect(200);

      expect(request.body).toEqual({
        status: 'success',
        books: [],
      });
    });
  });
});
