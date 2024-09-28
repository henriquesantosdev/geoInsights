import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'
import { prisma } from "../../lib/prisma";

export const deleteMunicipality = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().delete('/api/municipatility/:municipalityId', {
        schema: {
            params: z.object({
                municipalityId: z.string().uuid()
            })
        }
    }, async (request) => {

        const { municipalityId } = request.params

        const municipalityDeleted = await prisma.municipality.delete({
            where: {
                id: municipalityId
            }
        })

        if (!municipalityDeleted) {
            return {
                "message": "Municipatility was not deleted!"
            }
        }

        return {
            "message": "Municipatility was deleted!"
        }
    })
}