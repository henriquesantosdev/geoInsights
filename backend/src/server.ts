import fastify from "fastify"
import cors from "@fastify/cors"
import { getPresentMunicipalities } from "./routes/get-present-municipalities"
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import { checkServer } from "./routes/check-server"
import { basePernambuco } from "./routes/bases/base-pernambuco"
import { getAbsentMunicipalities } from "./routes/get-absent-municipalities"
import { getMunicipality } from "./routes/get-municipatility"
import { updateMunicipality } from "./routes/update-municipality"
import { deleteMunicipality } from "./routes/delete-municipality"

const app = fastify()

app.register(cors, {
    origin: true
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(checkServer)
app.register(basePernambuco)
app.register(getPresentMunicipalities)
app.register(getAbsentMunicipalities)
app.register(getMunicipality)
app.register(updateMunicipality)
app.register(deleteMunicipality)

// app.register()

app.listen({ port: 3333 }).then((address) => {
    console.log(`🚀 Server is running on: \x1b[32m${address}/api`)
}).catch(err => {
    console.error(`❌ Failed to start server: ${err.message}`)
    process.exit(1)
})