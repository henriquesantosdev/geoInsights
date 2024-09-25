import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export const getAdquiredMunicipalities = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get('/adquired/:municipality', {
        schema: {
            params: z.object({
                municipality: z.string()
            })
        }
    }, async (request, reply) => {
        const { municipality } = request.params
    })
}