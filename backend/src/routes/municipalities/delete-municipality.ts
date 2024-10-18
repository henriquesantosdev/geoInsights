import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";

export const deleteMunicipality = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().delete('/api/municipality/:municipalityId', {
        schema: {
            params: z.object({
                municipalityId: z.string().uuid(),
            }),
        },
    }, async (request, reply) => {
        const { municipalityId } = request.params;

        try {
            await prisma.municipalityDetails.deleteMany({
                where: {
                    municipalityId: municipalityId,
                },
            });

            await prisma.concorrence.deleteMany({
                where: {
                    municipalityId: municipalityId,
                },
            });

            await prisma.municipality.delete({
                where: {
                    id: municipalityId,
                },
            });

            return reply.status(200).send({
                message: "Municipality was deleted!",
            });
        } catch (error) {
            console.error("Error deleting municipality:", error);

            if (error instanceof Error) {
                console.error("Error message:", error.message);
                console.error("Error stack:", error.stack);

                return reply.status(500).send({
                    message: "Internal server error while deleting municipality",
                    error: error.message, // Enviar mensagem de erro para depuração
                });
            }

            return reply.status(500).send({
                message: "An unknown error occurred",
            });
        }
    });
};
