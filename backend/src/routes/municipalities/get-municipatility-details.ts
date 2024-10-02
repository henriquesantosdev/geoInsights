import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'
import { prisma } from "../../lib/prisma";

export const getMunicipalityDetails = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get('/api/municipalitydetails/:municipalityId', {
        schema: {
            params: z.object({
                municipalityId: z.string().uuid()
            })
        }
    }, async (request, reply) => {

        const { municipalityId } = request.params

        let result

        const municipalityDetailsFound = await prisma.municipalityDetails.findUnique({
            where: {
                municipalityId
            },
            select: {
                id: true,
                populationQuantity: true,
                secretaryContact: true,
                secretaryName: true,
                ubsQuantity: true,
            }
        })

        if (!municipalityDetailsFound) {
            return reply.status(204).send()
        }

        result = municipalityDetailsFound

        return {
            ...result,
            ubsQuantity: result.ubsQuantity.toString(),
            populationQuantity: result.populationQuantity.toString(),
            secretaryContact: result.secretaryContact.toString(),
        }
    }
    )
}