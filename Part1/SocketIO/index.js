const express = require('express')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
});

app.get('/:id', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
});

io.on('connection', (socket) => {
    const {id} = socket
    console.log(`connect ${id}`);

    socket.on('message-to-me', (msg) => {
        msg.type = 'me';
        socket.emit('message-to-me', msg)
    })

    socket.on('message-to-all', (msg) => {
        msg.type = 'all';
        socket.broadcast.emit('message-to-all', msg)
        socket.emit('message-to-all', msg)
    })

    const {roomName} = socket.handshake.query
    console.log(`roomName - ${roomName}`);
    socket.join(roomName)
    socket.on('message-to-room', (msg) => {
        msg.type = `roomName: ${roomName}`
        socket.to(roomName).emit('message-to-room', msg)
        socket.emit('message-to-room', msg)
    })
    

    socket.on('disconnect', () => {
        console.log(`disconnect ${id}`);
        
    })
})


const PORT = process.env.PORT || 7000
server.listen(PORT)