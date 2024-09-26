import type { FastifyInstance } from "fastify";

export async function getAbsentMunicipalities(app: FastifyInstance) {
    app.get('/absent/municipalities', async () => {
        return 'getting absent municipalities!'
    })
}