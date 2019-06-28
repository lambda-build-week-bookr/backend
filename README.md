### README FILE

#### Local Installation

1. `git clone https://github.com/lambda-build-week-bookr/backend.git bookr-backend`
1. `npm install`
1. `npx knex migrate:latest`
1. `npx knex seed:run`
   - **NOTE: IF THE SEED DOES NOT RUN**
   - it is grabbing books from a dynamic endpoint that does not return consistent data.
   - Run the seed a couple of times and it should succeed.
1. `npm run dev`
1. `npm run test`

**NOTE:** I did not have time to do in-depth data validation for the endpoints. API doesn't have consistent data across book lists and individual book views. This may cause some oddities, such as the seed failing.

---

#### Environment Variables

**process.env.`BOOK_ENV`** - Google Books API Key

**process.env.`JWT_SECRET`** - Secret for Json Web Token

**process.env.`DB_ENV`** - Defaults to development, set to production for a production database

---
#### API Documentation

1. Run `npm run docs`
1. Goto `localhost:4444/api/docs`

---

#### Undocumented / Admin Endpoints

`DELETE api/books/` - admin role access only to delete a book

`GET api/books/search/:term` - admin role only, searches dynamic Google API based on query term

`POST api/books/:gid` - admin role only, adds a book to the database from the Google API book id.
