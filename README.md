### README FILE

####Local Installation
1. `git clone https://github.com/lambda-build-week-bookr/backend.git bookr-backend`
1. `npm install`
1. `npx knex migrate:latest`
1. `npx knex seed:run`
   - **NOTE: IF THE SEED DOES NOT RUN**
   - it is grabbing books from a dynamic endpoint that does not return consistent data.
   - Run the seed a couple of times and it should succeed.

npm run dev
npm run test

generate api docs
npm run docs

####asdfasdf


I did not have extra time for additional validation beyond a couple of basic checks for database requirements. 