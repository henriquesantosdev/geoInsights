import fastify from "fastify"
import cors from "@fastify/cors"
import { getPresentMunicipalities } from "./routes/get-present-municipalities"
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import { checkServer } from "./routes/check-server"
import { basePernambuco } from "./routes/bases/base-pernambuco"

const app = fastify()

app.register(cors, {
    origin: true
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(checkServer)
app.register(basePernambuco)
app.register(getPresentMunicipalities)

app.listen({ port: 3333 }).then((address) => {
    console.log(`🚀 Server is running on: \x1b[32m${address}`)
}).catch(err => {
    console.error(`❌ Failed to start server: ${err.message}`)
    process.exit(1)
})