import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime";

const fastifyPrisma: FastifyPluginCallback<PrismaClientOptions> = (
  fastify,
  options,
  done
) => {
  const prisma = new PrismaClient({
    datasources: options?.datasources,
    log: options?.log,
    errorFormat: options?.errorFormat,
    rejectOnNotFound: options?.rejectOnNotFound,
  });
  fastify.addHook("onReady", (next) => {
    fastify.decorate("prisma", prisma);
    fastify.decorateRequest("prisma", prisma);
    next();
  });
  done();
};

export default fp(fastifyPrisma, {
  fastify: "3.x",
  name: "fastify-prisma-client",
});

declare module "fastify" {
  interface FastifyRequest {
    prisma: PrismaClient;
  }
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}
