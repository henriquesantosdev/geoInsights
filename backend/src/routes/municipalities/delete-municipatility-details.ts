import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'
import { prisma } from "../../lib/prisma";

export const deleteMunicipalityDetails = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().delete('/api/municipalitydetails/:municipalityId', {
        schema: {
            params: z.object({
                municipalityId: z.string().uuid()
            })
        }
    }, async (request, reply) => {

        const { municipalityId } = request.params

        const municipalityDetailsFound = await prisma.municipalityDetails.findUnique({
            where: {
                municipalityId
            }
        })

        if (!municipalityDetailsFound) {
            return {
                "message": "municipality details not found!",
                "statusCode": 404
            }
        }

        await prisma.municipalityDetails.delete({
            where: {
                municipalityId
            }
        })

        return reply.status(200).send({
            message: "municipality details deleted!",
            statusCode: 200
        });
    })
}