const supertest = require('supertest');
const cleaner = require('knex-cleaner');

const db = require('../../../data/db.config');
const server = require('../../server');

const register = '/api/auth/register';
const login = '/api/auth/login';
const user = {
  email: 'test@gmail.com',
  username: 'Taz',
  password: 'abc123',
};

describe('Authentication', () => {
  beforeAll(() => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  beforeEach(async () => {
    // await cleaner.clean(db, {
    //   mode: 'truncate',
    //   ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
    // });
    await db('user').truncate();
  });

  it('should work', () => {
    expect(1).toBe(1);
  });

  it('should respond with status 200', async () => {
    const request = await supertest(server)
      .get('/api/auth')
      .expect(200);
    expect(request.body).toEqual({
      message: 'Auth API is up',
    });
  });

  describe('POST /register', () => {
    it('should handle missing data / 422', async () => {
      let request = await supertest(server)
        .post(register)
        .send({
          email: 'nopassword@gmail.com',
          username: 'user',
        })
        .expect(422);
      expect(request.body).toEqual({
        status: 'error',
        error: "MissingField",
        message: `Missing required field (password)`,
      });

      request = await supertest(server)
        .post(register)
        .send({
          password: 'abc123',
          username: 'user',
        })
        .expect(422);
      expect(request.body).toEqual({
        status: 'error',
        error: "MissingField",
        message: `Missing required field (email)`,
      });

      request = await supertest(server)
        .post(register)
        .send({
          password: 'abc123',
          email: 'nouser@gmail.com',
        })
        .expect(422);
      expect(request.body).toEqual({
        status: 'error',
        error: "MissingField",
        message: `Missing required field (username)`,
      });
    });

    it('should handle wrong data types / 422', async () => {
      let request = await supertest(server)
        .post(register)
        .send({
          email: 'nopassword@gmail.com',
          username: 'Taz',
          password: 3,
        })
        .expect(422);
      expect(request.body).toEqual({
        status: 'error',
        error: "InvalidType",
        message: `Expected type for (password) to be string, but instead saw number`,
      });

      request = await supertest(server)
        .post(register)
        .send({
          email: 3,
          username: 'Taz',
          password: 'abc123',
        })
        .expect(422);
      expect(request.body).toEqual({
        status: 'error',
        error: "InvalidType",
        message: `Expected type for (email) to be string, but instead saw number`,
      });

      request = await supertest(server)
        .post(register)
        .send({
          email: 'baduser@gmail.com',
          username: 3,
          password: 'abc123',
        })
        .expect(422);
      expect(request.body).toEqual({
        status: 'error',
        error: "InvalidType",
        message: `Expected type for (username) to be string, but instead saw number`,
      });
    });

    it('should create a new user / 201', async () => {
      const request = await supertest(server)
        .post(register)
        .send(user)
        .expect(201);

      expect(request.body).toEqual({
        status: 'success',
        message: `Successfully registered user with email ${user.email}`,
        user: {
          username: 'Taz',
          role: 'user',
          email: user.email,
          token: request.body.user.token,
        },
      });

      const users = await db('user');
      const length = (users.length === 1) || (users.length === 2) ? true : false;
      expect(length).toBeTruthy();
    });

    it('should return a token upon registration / 201', async () => {
      const request = await supertest(server)
        .post(register)
        .send(user)
        .expect(201);
      expect(request.body.user.token).toBeTruthy();
    });

    it('should handle duplicate email / 400', async () => {
      await supertest(server)
        .post(register)
        .send(user)
        .expect(201);

      let request = await supertest(server)
        .post(register)
        .send({
          ...user,
          username: 'NewUsername',
        })
        .expect(400);
      
      expect(request.body).toEqual({
        status: 'error',
        error: 'NonUnique',
        message: `Provided \`email\` must be unique: \`${user.email}\` already exists in the database`,
      });
    });

    it('should handle duplicate username / 400', async () => {
      await supertest(server)
        .post(register)
        .send(user)
        .expect(201);

      const request = await supertest(server)
        .post(register)
        .send({
          ...user,
          email: 'newe2345mail@gmail.com',
        })
        .expect(400);
      
      expect(request.body).toEqual({
        status: 'error',
        error: 'NonUnique',
        message: `Provided \`username\` must be unique: \`${user.username}\` already exists in the database`,
      });
    });
  });

  describe('POST /login', () => {
    it('should handle missing data / 422', async () => {
      let request = await supertest(server)
        .post(login)
        .send({
          email: 'nopassword@gmail.com',
        })
        .expect(422);
      expect(request.body).toEqual({
        status: 'error',
        error: "MissingField",
        message: `Missing required field (password)`,
      });

      request = await supertest(server)
        .post(login)
        .send({
          password: 'abc123',
        })
        .expect(422);
      expect(request.body).toEqual({
        status: 'error',
        error: "MissingField",
        message: `Missing required field (email)`,
      });
    });

    it('should handle wrong data types / 422', async () => {
      let request = await supertest(server)
        .post(login)
        .send({
          email: 'nopassword@gmail.com',
          password: 3,
        })
        .expect(422);
      expect(request.body).toEqual({
        status: 'error',
        error: "InvalidType",
        message: `Expected type for (password) to be string, but instead saw number`,
      });

      request = await supertest(server)
        .post(login)
        .send({
          email: 3,
          password: 'abc123',
        })
        .expect(422);
      expect(request.body).toEqual({
        status: 'error',
        error: "InvalidType",
        message: `Expected type for (email) to be string, but instead saw number`,
      });
    });

    it('should return a token upon login / 200', async () => {
      await supertest(server)
        .post(register)
        .send(user)
        .expect(201);
      
      const request = await supertest(server)
        .post(login)
        .send(user)
        .expect(200);
      expect(request.body).toEqual({
        status: 'success',
        message: `Successfully logged in with \`email\` ${user.email}`,
        user: {
          username: 'Taz',
          email: user.email,
          role: 'user',
          token: request.body.user.token,
        },
      });
    });

    it('should correctly handle invalid credentials / 401', async () => {
      await supertest(server)
        .post(register)
        .send(user)
        .expect(201);
      
      const request = await supertest(server)
        .post(login)
        .send({
          ...user,
          password: 'nopechucktesta',
        })
        .expect(401);
      
      expect(request.body).toEqual({
        status: 'error',
        error: 'InvalidCredentials',
        message: 'Invalid Credentials',
      });
    });
  });
});
