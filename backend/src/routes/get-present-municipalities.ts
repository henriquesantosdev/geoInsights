import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'

export const getPresentMunicipalities = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get('/api/present/municipalities/:state', {
        schema: {
            params: z.object({
                state: z.string()
            })
        }
    }, async (request, reply) => {

        const { state } = request.params

        return `getting present municipalities!: ${state}`

    })
}