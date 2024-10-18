import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'
import { prisma } from "../../lib/prisma";

export const updateMunicipality = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().put('/api/municipality/:municipalityId', {
        schema: {
            params: z.object({
                municipalityId: z.string().uuid()
            }),
            body: z.object({
                present: z.boolean(),
                concorrencePresent: z.boolean()
            })
        }
    }, async (request, reply) => {

        const { municipalityId } = request.params
        const { present, concorrencePresent } = request.body

        const municipalityFound = await prisma.municipality.findUnique({
            where: {
                id: municipalityId
            },
            include: {
                concorrence: true
            }
        })

        if (!municipalityFound) {
            return {
                "message": "Municipality not found!"
            }
        }

        if (municipalityFound.concorrence) {
            await prisma.concorrence.delete({
                where: {
                    municipalityId
                }
            })
        }

        await prisma.municipality.update({
            where: {
                id: municipalityId
            },
            data: {
                present,
                concorrencePresent
            }
        })
    })
}