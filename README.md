# NODE.JS CRUD API

## Description

Implemented a simple CRUD api for work with users using in-memory database underneath.

## Used technologies:
- TypeScript
- nodemon
- dotenv
- cross-env
- ts-node
- eslint
- uuid
- jest
- supertest
- node.js version: 16 LTS

## Easy to use:
- Download project files (project located in *crud-api* branch)
- Go to project root directory
- Run `npm i`

## Pre-defined npm scripts:
+ `npm run start:dev` -> The application is run in development mode using nodemon
+ `npm run start:prod` -> The application is run in production mode (runs the build process and then runs the bundled file)
+ `npm run start:multi` -> Runs multiple instances of application using the Node.js Cluster API (equal to the number of logical processor cores on the host machine) with a load balancer that distributes requests across them
+ `npm run lint` -> identify errors found in the code, and generate reports about them.
+ `npm run lintfix` -> it detects errors found in the code and tries to fix them.
+ `npm run test` -> launches the test runner in the interactive watch mode.

## Application functionality:
Implemented endpoint `api/users`:
- **GET** `api/users` is used to get all persons
  - Server should answer with `status code` **200** and all users records
- **GET** `api/users/${userId}` 
  - Server should answer with `status code` **200** and and record with `id === userId` if it exists
  - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
- **POST** `api/users` is used to create record about new user and store it in database
  - Server should answer with `status code` **201** and newly created record
  - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
- **PUT** `api/users/${userId}` is used to update existing user
  - Server should answer with `status code` **200** and updated record
  - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
- **DELETE** `api/users/${userId}` is used to delete existing user from database
  - Server should answer with `status code` **204** if the record is found and deleted
  - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

## Authors:
 *[Denis Karazan](https://github.com/Wolf-Den1994)*