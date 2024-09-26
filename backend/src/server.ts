import fastify from "fastify"
import cors from "@fastify/cors"
import { getAbsentMunicipalities } from "./routes/get-absent-municipalities"
import { getPresentMunicipalities } from "./routes/get-present-municipalities"

const app = fastify()

app.register(cors, {
    origin: true
})

app.register(getAbsentMunicipalities)
app.register(getPresentMunicipalities)

app.listen({ port: 3333 }).then((address) => {
    console.log(`🚀 Server is running on: \x1b[32m${address}`)
}).catch(err => {
    console.error(`❌ Failed to start server: ${err.message}`)
    process.exit(1)
})