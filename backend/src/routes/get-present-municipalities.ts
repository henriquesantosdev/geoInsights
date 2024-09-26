import type { FastifyInstance } from "fastify";

export async function getPresentMunicipalities(app: FastifyInstance) {
    app.get('/present/municipalities', async () => {
        return 'getting present municipalities!'
    })
}