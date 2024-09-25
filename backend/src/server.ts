import Fastify from 'fastify'
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import cors from '@fastify/cors'
import { env } from './env'

const app = Fastify()

app.register(cors, {
  origin: true
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// app.register()

app.listen({port: env.PORT}).then((address) => console.log(`🚀 Server is running on: \x1b[32m${address}`))