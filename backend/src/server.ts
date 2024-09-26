import fastify from "fastify"
import cors from "@fastify/cors"

const app = fastify()

app.register(cors, {
    origin: true
})

app.get('/', () => {
    return 'hello, world!'
})

app.listen({port: 3333 }).then((address) => {
    console.log(`🚀 Server is running on: \x1b[32m${address}`)
})