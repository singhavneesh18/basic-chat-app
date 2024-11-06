const express= require('express')
const http = require('http')
const { Server } = require('socket.io')
const path = require('path')


const app = express()
const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket)=>{
    console.log(`New connection on ${socket.id}`)

    socket.on('chat-message', (msg)=>{
        console.log(`Message received : ${msg}`)
        io.emit('chat-message',msg)
    })


})

app.get('/', (req, res)=>{
    res.sendFile(path.resolve('./example-one/public/index.html'))
})


server.listen(3000)