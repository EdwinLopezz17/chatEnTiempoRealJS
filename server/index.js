import express from "express"
import logger from "morgan"

import { Server } from "socket.io"
import { createServer } from 'node:http'
import { Socket } from "node:dgram"

const port = process.env.port ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server,{
    connectionStateRecovery:{}
})

io.on('connection', (socket)=>{
    console.log('a user has connected')

    socket.on('disconnect', ()=>{
        console.log('an user disconnected')
    })

    socket.on('chat message', (msg)=>{
        io.emit('chat message',msg)
    })
})

app.use(logger('dev'))

app.get('/', (req, res)=>{
    console.log(process.cwd()+'/client/index.html')
    res.sendFile(process.cwd()+'/client/index.html')
})

server.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})


