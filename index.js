const express = require("express")
const app = express()
const path = require("path")
const http = require("http")
const socket = require("socket.io")

// Setup Port
const PORT = process.env.PORT || 5000
const server = http.createServer(app)

// Socket setup
const io = socket(server)

// Access static page
app.use(express.static(path.join(__dirname, "public")))


io.on("connection", (socket) => {
    
    // sending username / data to all clients
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    })
    socket.on('join', data =>{
        socket.broadcast.emit('join', data)
    })
    socket.on('typing', data => {
        socket.broadcast.emit('typing', data)
    })
})

server.listen(PORT)