const express = require("express")
// const mongoose = require('mongoose')
const app = express()
const http = require("http").Server(app)
const SOCKET_SERVER_PORT = process.env.PORT || 8000
const io = require("socket.io")(http, {
    cors: ["*"]
})

// MNOGODB MODELS 
// const MONGODB_USER = "tom"
// const MONGODB_PASSWORD = "waterbottle"
// const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.yyiz64c.mongodb.net/?retryWrites=true&w=majority`;
// if (!(global._mongooseConnection)) {
//     mongoose.connect(MONGODB_URI, {}).then(() => {
//         global._mongooseConnection = mongoose.connection;
//         console.log("Mongo Connection Successful")
//         mongoose.connection.on('error', err => {
//             console.error(err);
//         });
//         mongoose.connection.on('disconnected', err => {
//             console.log("Mongoose Disconnected", err);
//         });
//     });
// }
// const audio_schema = new mongoose.Schema({
//     main_author_wallet_address: { type: String, required: true, unique: false },
//     created_at: { type: Date, default: Date.now },
//     is_active: { type: Boolean, default: false },
//     audio_data: { type: [Buffer], default: [] },
//     description: { type: String, default: "" },
//     title: { type: String, default: "" },
// });

// const audio_room_model = mongoose.models.AudioRoom || mongoose.model('AudioRoom', audio_schema);

// SERVER APPLICATION

console.log("\n----------- Server Started -----------------\n");

app.get("/", function (req, res) {
    res.json({ message: "Hello from socket server" })
})

io.on('connection', (socket) => {
    console.log("New Connection:", socket.id);
    socket.on('send-data-to-room', (room, data) => {
        // audio_room_model.updateOne(
        //     {_id: room},
        //     { $push: { audio_data: data } },
        //     { new: false }
        // )
        // console.log(data);
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
