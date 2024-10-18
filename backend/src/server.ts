import fastify from "fastify"
import cors from "@fastify/cors"
import { getPresentMunicipalities } from "./routes/municipalities/get-present-municipalities"
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import { checkServer } from "./routes/check-server"
import { getAbsentMunicipalities } from "./routes/municipalities/get-absent-municipalities"
import { getMunicipality } from "./routes/municipalities/get-municipatility"
import { updateMunicipality } from "./routes/municipalities/update-municipality"
import { deleteMunicipality } from "./routes/municipalities/delete-municipality"
import { getMunicipalityDetails } from "./routes/municipalities/get-municipatility-details"
import { createOrUpdateMunicipalityDetails } from "./routes/municipalities/create-or-update-municipatility-details"
import { deleteMunicipalityDetails } from "./routes/municipalities/delete-municipatility-details"
import { createOrUpdateConcorrence } from "./routes/concorrence/create-or-update-concorrence"

const app = fastify()

app.register(cors, {
    origin: true
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(checkServer)
app.register(getPresentMunicipalities)
app.register(getAbsentMunicipalities)
app.register(getMunicipality)
app.register(updateMunicipality)
app.register(deleteMunicipality)
app.register(getMunicipalityDetails)
app.register(createOrUpdateMunicipalityDetails)
app.register(deleteMunicipalityDetails)
app.register(createOrUpdateConcorrence)

app.listen({ port: 3333 }).then((address) => {
    console.log(`🚀 Server is running on: \x1b[32m${address}/api`)
}).catch(err => {
    console.error(`❌ Failed to start server: ${err.message}`)
    process.exit(1)
})