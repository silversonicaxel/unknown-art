# unknown art

[https://unknown-art.club/](https://unknown-art.club/) is the club that will introduce you to arty and independent bookstores, all over the world.

## Technicalities

This is a [Next.js](https://nextjs.org/) application, based on [React.js](https://react.dev/), [Typescript](https://www.typescriptlang.org/) and [CSS Modules](https://github.com/css-modules/css-modules).

`npm` is the package manager used.

First, install the dependencies:

```bash
npm i
```

Then, start the local server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Lint:

```bash
npm run lint
```

Fix:

```bash
npm run fix
```

## Testing

Unit Tests are built with [Vitest](https://vitest.dev/).

```bash
npm run test:unit
```

E2e Tests are built with [Playwright](https://playwright.dev/).

```bash
npm run test:e2e
```

## Development configuration

### .env

`.env` configuration needs to be set on `.env.local`

### MongoDb

#### Option 1: Remote

Mongodb security settings for local development require an IP whitelist to work.

Network Access -> IP Access List -> 0.0.0.0/0

Set in `.env` the remote configuration

```bash
MONGO_DB_URL=mongodb+srv://[MONGODB_USER]:[MONGODB_PASSWORD]@[MONGODB_URL]/
```

#### Option 2: Local with Docker Compose

Set in `.env` the dockerized local configuration

```bash
MONGO_DB_URL="mongodb://myUser:myPassword@localhost:27017/"
```

You can use Docker Compose to run a MongoDB instance for local development.

First, make sure you have Docker and Docker Compose installed on your machine.

Then, you can start and afterwards end the MongoDB instance with the following command:

```bash
docker-compose -f docker-compose.yml [up|down]
```
