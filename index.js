const path = require("path")
const http = require("http")
const express = require("express")
const app = express()
const socket = require("socket.io")

// Setup Port
const PORT = process.env.PORT || 3030
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
    
    io.emit('online', Object.keys(io.sockets.connected).length)

    socket.on('closeChat', data => {
        socket.broadcast.emit('closeChat', data)
    })
    
})



// Listen to port
server.listen(PORT)
