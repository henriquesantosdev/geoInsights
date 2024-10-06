import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'

export const checkServer = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get('/api', {
        schema: {}
    }, async (response, reply) => {
        return reply.status(200).send({
            "message": "I'm online!"
        })
    })
}