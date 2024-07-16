# unknown-art

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

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

Tests are built with Vitest.

```bash
npm run test
```

## Development configuration

### .env

.env configuration is set on .env.local

You can use the .env.example file as a template.

### MongoDb

#### Option 1: Remote

Mongodb security settings for local development require an IP whitelist to work.

Network Access -> IP Access List -> 0.0.0.0/0

#### Option 2: Local with Docker Compose

You can use Docker Compose to run a MongoDB instance for local development.

First, make sure you have Docker and Docker Compose installed on your machine.

Then, you can start the MongoDB instance with the following command:

```bash
docker-compose -f docker-compose.yml [up|down]
```

## Production configuration

### .env

/

### MongoDb

/
