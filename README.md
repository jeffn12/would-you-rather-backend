# "Would You Rather?" - Backend

This is an Express backend server for interacting with a MongoDB collection that holds question and user information for the game, "Would You Rather?" This server will host the API endpoints that the [React/Redux frontend](https://github.com/jeffn12/reactnd-project-would-you-rather) will call.

## API Endpoints

| -              | /GET              | /POST          | /PUT | /DELETE         |
| -------------- | ----------------- | -------------- | ---- | --------------- |
| /api/users     | get all users     | add a user     | /    | delete user     |
| /api/questions | get all questions | add a question | /    | delete question |

## Getting Started

This is currently in development, and must be run locally. You must install `nodejs` and `node package manager (npm)` before running the server.

### Installation

1. clone or fork this repo to your computer
1. run `npm install` to install all of the dependencies

### Usage

1. `npm start` will start the server (default port: 3000)

- for debug mode, use the following commands:
  - MacOS/Linux: `DEBUG=myapp:* npm start`
  - Windows (command prompt): `set DEBUG=myapp:* & npm start`
  - Windows (PowerShell): `$env:DEBUG='myapp:*'; npm start`

## Thanks

This project was bootstrapped with ["Express Generator"](https://www.npmjs.com/package/express-generator)
