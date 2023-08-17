import 'dotenv/config.js'
import express from "express"
import indexRouter from "./router/indexRouter.js"
import cors from 'cors'

const server = express()

server.use('/api', indexRouter)

server.get('/', (request, response, next) =>{
response.send('Bienvenido a mi servidor en /')
})



server.listen(3000, ()=>{console.log('Servidor corriendo en puerto 3000')})