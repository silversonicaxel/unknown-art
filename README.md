# unknown art

[https://unknown-art.club/](https://unknown-art.club/) is the club that will introduce you to arty and independent bookstores, all over the world.

## Technicalities

This is a [Next.js](https://nextjs.org/) application, based on [React.js](https://react.dev/), [Typescript](https://www.typescriptlang.org/) and [CSS Modules](https://github.com/css-modules/css-modules).

`npm` is the package manager used.

Local server:

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

Tests are built with [Vitest](https://vitest.dev/).

```bash
npm run test
```

## Development configuration

### .env

.env configuration is set on .env.local

### MongoDb

Mongodb security settings for local development require an IP whitelist to work.

Network Access -> IP Access List -> 0.0.0.0/0
