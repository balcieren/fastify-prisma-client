# fastify-prisma-client

[![Version](https://img.shields.io/npm/v/fastify-prisma-client.svg)](https://www.npmjs.com/package/fastify-prisma-client)

easy access to prisma client

## Warning !

This package is for ease of access only so you must install prisma.

## Installation

```bash
yarn add prisma fastify-prisma-client
or
npm install prisma fastify-prisma-client
```

## Do not forget prisma generate ❗

```bash
yarn prisma generate
or
npx prisma generate
```

## Usage

Register plugin

```js
import fastifyPrismaClient from "fastify-prisma-client";

fastify.register(fastifyPrismaClient);
```

If you use with TypeScript , you have to give this type to avoid error

```js
import Fastify, { FastifyInstance } from "fastify";

const fastify: FastifyInstance = Fastify();
```

Prisma client options are available and you can edit them

```js
fastify.register(fastifyPrismaClient, {});
```

Use with fastify decorate

```js
fastify.get("/users", async (request, reply) => {
  const users = await fastify.prisma.users.findMany();
  return { users };
});
```

Use with request decorate

```js
fastify.get("/users", async (request, reply) => {
  const users = await request.prisma.users.findMany();
  return { users };
});
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
