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
            },
            include: {
                concorrence: true,
                municipalityDetails: true
            }
        })

        if (!municipalityFound) {
            return {
                message: 'Municipality not found!',
            }
        }

        return municipalityFound
    }
    )
}