import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'
import { prisma } from "../../lib/prisma";

export const getPresentMunicipalities = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get('/api/present/municipalities/:state', {
        schema: {
            params: z.object({
                state: z.string()
            })
        }
    }, async (request, reply) => {

        const { state } = request.params

        const searchedState = await prisma.state.findFirst({
            where: {
                name: state
            },
            include: {
                municipalities: {
                    where: {
                        present: true,
                    }
                }
            }
        })

        if (searchedState) {
            return searchedState
        } else {
            return {
                message: 'State not found!',
                state: state
            }
        }
    })
}