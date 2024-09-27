import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'
import { prisma } from "../lib/prisma";

export const updateMunicipality = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().put('/api/:municipalityId', {
        schema: {
            params: z.object({
                municipalityId: z.string().uuid()
            }),
            body: z.object({
                present: z.boolean()
            })
        }
    }, async (request, reply) => {

        const { municipalityId } = request.params
        const { present } = request.body

        const municipalityFound = await prisma.municipality.findUnique({
            where: {
                id: municipalityId
            }
        })

        if (!municipalityFound) {
            return {
                "message": "Municipatilit not found!"
            }
        }

        const municipalityUpdated = await prisma.municipality.update({
            where: {
                id: municipalityId
            },
            data: {
                present
            }
        })

        if (!municipalityUpdated) {
            return {
                "message": "Municipatilit not upadated!"
            }
        }

        return {
            "message": "Municipatility updated!",
            municipalityUpdated
        }

    })
}