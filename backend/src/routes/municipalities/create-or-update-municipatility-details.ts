import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from 'zod'
import { prisma } from "../../lib/prisma";

export const createOrUpdateMunicipalityDetails = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post('/api/municipalitydetails', {
        schema: {
            body: z.object({
                municipalityId: z.string().uuid(),
                ubsQuantity: z.number().min(1),
                populationQuantity: z.number(),
                secretaryName: z.string(),
                secretaryContact: z.number().min(11)
            })
        }
    }, async (request) => {

        const { municipalityId, ubsQuantity, populationQuantity, secretaryName, secretaryContact } = request.body

        let result

        const municipalityDetailsFound = await prisma.municipalityDetails.findUnique({
            where: {
                municipalityId
            }
        })

        if (municipalityDetailsFound) {
            const updatedMunicipalityDetails = await prisma.municipalityDetails.update({
                where: {
                    municipalityId
                },
                data: {
                    ubsQuantity,
                    populationQuantity,
                    secretaryContact,
                    secretaryName,
                }
            })

            result = updatedMunicipalityDetails

            return {
                "message": "Municipality details updated!",
                "data": {
                    ...result,
                    ubsQuantity: result.ubsQuantity.toString(),
                    populationQuantity: result.populationQuantity.toString(),
                    secretaryContact: result.secretaryContact.toString(),
                }
            }
        }

        const createdMunicipalityDetails = await prisma.municipalityDetails.create({
            data: {
                municipalityId,
                ubsQuantity,
                populationQuantity,
                secretaryContact,
                secretaryName,
            }
        })

        result = createdMunicipalityDetails

        return {
            "message": "Municipality details created!",
            "data": {
                ...result,
                ubsQuantity: result.ubsQuantity.toString(),
                populationQuantity: result.populationQuantity.toString(),
                secretaryContact: result.secretaryContact.toString(),
            }
        }

    })
}