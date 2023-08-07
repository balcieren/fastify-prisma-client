import Fastify from "fastify";
import tap from "tap";
import fastifyPrismaClient from "../index";

const buildApp = async (t: Tap.Test) => {
    const fastify = Fastify({ logger: { level: "error" } });

    t.teardown(() => {
        fastify.close();
    });

    return fastify;
};

tap.test("fastify-prisma-client test", async (t) => {
    t.test("register plugin", async (t) => {
        const fastify = await buildApp(t);

        try {
            await fastify.register(fastifyPrismaClient);
            t.ok("prisma" in fastify, "should be include prisma in fastify");
        } catch (error) {
            console.log(error);
            t.error(error);
        }
    });

    t.test("generated user by prisma", async (t) => {
        const fastify = await buildApp(t);

        try {
            await fastify.register(fastifyPrismaClient);
            t.ok("user" in fastify.prisma, "should be include user in fastify.prisma");
        } catch (error) {
            console.log(error);
            t.error(error);
        }
    });
});
