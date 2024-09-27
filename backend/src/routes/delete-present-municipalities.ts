import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'

export const getPresentMunicipalities = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().delete('/api/present/municipalities', {
        schema: {
            body: z.object({
                state: z.string()
            })
        }
    }, async (request, reply) => {

        const { state } = request.body

        return `getting present municipalities!: ${state}`

    })
}