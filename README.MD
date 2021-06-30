# fastify-prisma-client

[![Version](https://img.shields.io/npm/v/fastify-prisma-client.svg)](https://www.npmjs.com/package/fastify-prisma-client)

easy access to prisma client in request

## Warning !

This package is for ease of access only so you must install prisma and @prisma/client.

## Installation

```bash
yarn add fastify-prisma-client
or
npm install fastify-prisma-client
```

## Usage

Register plugin

```js
import fastifyPrisma from "fastify-prisma-client";

fastify.register(fastifyPrisma);
```

Prisma client options are available and you can edit them

```js
fastify.register(fastifyPrisma, {});
```

Use with request

```js
fastify.get("/users", async (request, reply) => {
  return await request.prisma.users.findMany();
});
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
