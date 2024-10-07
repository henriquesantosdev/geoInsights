import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'
import { prisma } from "../../lib/prisma";

export const createOrUpdateConcorrence = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post('/api/concorrence', {
        schema: {
            body: z.object({
                municipalityId: z.string().uuid(),
                name: z.string().min(4),
                contractStarted: z.coerce.date(),
                contractEnd: z.coerce.date(),
                value: z.number().min(1),
                service: z.string()
            })
        }
    }, async (request, reply) => {

        const { municipalityId, name, service, contractStarted, contractEnd, value } = request.body

        const concorrenceFound = await prisma.concorrence.findUnique({
            where: {
                municipalityId
            }
        })

        if (concorrenceFound) {

            const concorrenceUpdated = await prisma.concorrence.update({
                where: {
                    municipalityId
                },
                data: {
                    name,
                    service,
                    value,
                    contractStarted,
                    contractEnd
                }
            })

            return reply.status(200).send(concorrenceUpdated)
        }

        const concorrenceCreated = await prisma.concorrence.create({
            data: {
                municipalityId,
                name,
                service,
                value,
                contractStarted,
                contractEnd
            }
        })

        return reply.status(201).send(concorrenceCreated)
    })
}