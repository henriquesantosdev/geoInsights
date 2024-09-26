import fastify from "fastify"
import cors from "@fastify/cors"
import { prisma } from "./lib/prisma"

const app = fastify()

app.register(cors, {
    origin: true
})

// app.get('/municipalities', (request, reply) => {
//     prisma.
// })

app.listen({ port: 3333, host: '0.0.0.0' }).then((address) => {
    console.log(`🚀 Server is running on: \x1b[32m${address}`)
}).catch(err => {
    console.error(`❌ Failed to start server: ${err.message}`)
    process.exit(1)
})