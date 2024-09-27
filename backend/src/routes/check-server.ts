import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'

export const checkServer = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get('/', {
        schema: {}
    }, async () => {
        return `I'm online!`
    })
}