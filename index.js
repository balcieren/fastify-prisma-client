"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const client_1 = require("@prisma/client");
const fastifyPrisma = (fastify, options, done) => {
    const prisma = new client_1.PrismaClient({
        datasources: options === null || options === void 0 ? void 0 : options.datasources,
        log: options === null || options === void 0 ? void 0 : options.log,
        errorFormat: options === null || options === void 0 ? void 0 : options.errorFormat,
        rejectOnNotFound: options === null || options === void 0 ? void 0 : options.rejectOnNotFound,
    });
    fastify.addHook("onReady", (next) => {
        fastify.decorateRequest("prisma", prisma);
        next();
    });
    done();
};
exports.default = fastify_plugin_1.default(fastifyPrisma);
