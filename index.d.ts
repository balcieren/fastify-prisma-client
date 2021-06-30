/// <reference types="node" />
import { FastifyPluginCallback } from "fastify";
import { PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime";
declare const _default: FastifyPluginCallback<PrismaClientOptions, import("http").Server>;
export default _default;
declare module "fastify" {
    interface FastifyRequest {
        prisma: PrismaClient;
    }
}
