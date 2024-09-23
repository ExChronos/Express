const express = require('express')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')

const app = express()       // создание экземпляра приложения
const server = http.Server(app)     // создание подключения типа 
const io = socketIO(server)     // создание экземпляра сокета, и передача туда сервера

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
})

app.get('/:id', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
})

io.on('connection', (socket) => {
    const {id} = socket
    console.log(id+'connect');

    socket.on('msg-to-me', (msg) => {
        msg.type='me'
        socket.emit('msg-to-me', msg)
    })

    socket.on('msg-to-all', (msg) => {
        msg.type='all'
        socket.broadcast.emit('msg-to-all', msg)
        socket.emit('msg-to-all', msg)
    })

    const {roomName} =  socket.handshake.query
    console.log(`roomName ${roomName}`)

    socket.join(roomName)

    socket.on('msg-to-room', (msg) => {
        msg.type=`roomName: ${roomName}`
        socket.to(roomName).emit('msg-to-room', msg)
        socket.emit('msg-to-room', msg)
    })
    
    socket.on('disconnect', () => {
        console.log('disconnect'+id);
        
    })
})

const PORT = process.env.PORT || 7000
server.listen(PORT)