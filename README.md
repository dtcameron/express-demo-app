# Backend Engineer Work Sample

This project skeleton contains a basic Express setup one endpoint to create a user and one endpoint to fetch all users, as well as a basic empty unit test.

This project uses the Prisma schemas as the source of truth, and then autogenerates Zod schemas for you to use when validating user input.

## Setup

1. `npm install` Use this to install dependencies
1. Set up your env file, you can get started with the `.env.example` provided
1. `db:migrate` Use this to generate the Zod schemas and migrations from the prisma schema
1. `db:push` Use this to push the created migrations to the database

## Scripts

`npm start` starts the server
`npm test` executes the tests

## Goal

1. Adjust POST /users that it accepts a user and stores it in a database.
    - The user should have a unique id, a name, a unique email address and a creation date
2. Adjust GET /users that it returns (all) users from the database.
    - This endpoint should be able to receive a query parameter `created` which sorts users by creation date ascending or descending.

Feel free to add or change this project as you like.
