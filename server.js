const express = require("express")
const app = express()
const http = require("http").Server(app)
const SOCKET_SERVER_PORT = process.env.PORT || 8000
const io = require("socket.io")(http, {
    cors: ["*"]
})


console.log("\n----------- Server Started -----------------\n");

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

io.on('connection', (socket) => {
    console.log("New Connection:", socket.id);
    socket.on('send-data-to-room', (room, data) => {
        console.log(data);
        socket.to(room).emit('receive-data', data)
    })

    socket.on('join-room', (room) => {
        console.log("Join Room", socket.id, "->", room);
        socket.join(room)
    })

    socket.on('exit-room', (room) => {
        console.log("Exit Room", socket.id, room);
        socket.leave(room)
    })

    socket.on('disconnect', () => {
        console.log("Disconnect :", socket.id);
    })

    socket.on('ping', (msg) => {
        socket.emin('ping', msg)
    })
})

http.listen(SOCKET_SERVER_PORT, () => {
    console.log(`App listening on port ${SOCKET_SERVER_PORT}`)
});
