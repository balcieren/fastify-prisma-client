import { PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime";
import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

export type FastifyPrismaClientOptions = Omit<
  PrismaClientOptions,
  "__internal"
>;

const prismaClient: FastifyPluginCallback<FastifyPrismaClientOptions> = async (
  fastify,
  options,
  next
) => {
  if (fastify.prisma) {
    return next(new Error("fastify-prisma-client has been defined before"));
  }

  const prisma = new PrismaClient(options);

  await prisma.$connect();

  fastify
    .decorate("prisma", prisma)
    .decorateRequest("prisma", { getter: () => fastify.prisma })
    .addHook("onClose", async (fastify, done) => {
      await fastify.prisma.$disconnect();
      done();
    });

  next();
};

const fastifyPrismaClient = fp(prismaClient, {
  name: "fastify-prisma-client",
  fastify: ">=3.x",
});

export default fastifyPrismaClient;

declare module "fastify" {
  interface FastifyRequest {
    prisma: PrismaClient;
  }
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}
