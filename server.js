// SECTION: CONSTANTS 
const SOCKET_SERVER_PORT = 3001

// SECTION: SERVER INITIALIZATION
const server = require("socket.io")(SOCKET_SERVER_PORT, {
    cors: ["*"]
})

console.log("\n----------- Server Started -----------------\n");

// SECTION: NAMESPACE IMPLEMENTATION
server.on('connection', (socket) => {
    console.log("New Connection:", socket.id);
    socket.on('send-data-to-room', (room, data) => {
        console.log(data);
        socket.to(room).emit('receive-data', data)
    })
    // ------ ROOM MANAGEMENT ------
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
})

