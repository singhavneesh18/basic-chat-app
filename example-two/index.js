const express= require('express')
const http = require('http')
const { Server } = require('socket.io')
const path = require('path')


const app = express()
const server = http.createServer(app)
const io = new Server(server)

const sockets = [];
io.on('connection', (socket)=>{
    sockets.push(socket)
    console.log(`New connection on ${socket.id}`)

    socket.on('chat-message', (msg)=>{
        console.log(`Message received : ${msg}`)
        sockets.filter(s=> s.id != socket.id).forEach(soc=> soc.emit('chat-message',msg));
    })


})

app.get('/', (req, res)=>{
    res.sendFile(path.resolve('./example-two/public/index.html'))
})


server.listen(3000)