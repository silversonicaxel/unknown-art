This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

`npm` is the package manager used.

Local server with express:

```bash
npm run dev:express
```

Local server without express:

```bash
npm run dev:standalone
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Lint:

```bash
npm run lint
```

## Development configuration

### .env

.env configuration is set on .env.local

### MongoDb

Mongodb security settings for local development require an IP whitelist to work.

Network Access -> IP Access List -> 0.0.0.0/0

## Production configuration

### .env

/

### MongoDb

/
