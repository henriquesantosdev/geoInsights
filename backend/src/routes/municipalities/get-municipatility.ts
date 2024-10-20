import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'
import { prisma } from "../../lib/prisma";

export const getMunicipality = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get('/api/municipality/:municipalityId', {
        schema: {
            params: z.object({
                municipalityId: z.string().uuid()
            })
        }
    }, async (request, reply) => {

        const { municipalityId } = request.params

        const municipalityFound = await prisma.municipality.findUnique({
            where: {
                id: municipalityId
            }
        })

        return reply.status(200).send(municipalityFound)
    }
    )
}