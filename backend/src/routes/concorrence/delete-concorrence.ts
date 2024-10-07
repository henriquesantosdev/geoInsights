import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'
import { prisma } from "../../lib/prisma";

export const updateConcorrence = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().delete('/api/concorrence/:municipalityId', {
        schema: {
            params: z.object({
                municipalityId: z.string().uuid(),
            })
        }
    }, async (request, reply) => {

        const { municipalityId } = request.params

        const concorrenceUpdated = await prisma.concorrence.delete({
            where: {
                municipalityId
            }
        })

        return reply.status(200).send()
    })
}