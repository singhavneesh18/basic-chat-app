const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const path = require('path')


const app = express()

const server = http.createServer(app)
const io = new Server(server)

const connectionInfo = [];
io.on('connection', (socket) => {
    // sockets.push(socket)
    console.log(`New socket detected on ${socket.id}`)

    socket.on('chat-message', (data) => {
        console.log("Message received :", data)
        connectionInfo
        .filter(con => (con.socket.id != socket.id && con.channelName === data.channelName))
        .forEach(con => con.socket.emit('chat-message', data));
    })

    socket.on('createConnection', data => {
        console.log("New user connected :", data)
        connectionInfo.push({ userName: data.userName, channelName: data.channelName, socket: socket })
    })


})

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./example-four/public/index.html'))
})

app.get('/ex4.js', (req, res) => {
    res.sendFile(path.resolve('./example-four/public/ex4.js'))
})


server.listen(3000)