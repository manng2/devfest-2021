require('dotenv').config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require('multer');

const users = {};

const socketToRoom = {};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/kittyholic',
{
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
}
).then(() => {
    console.log('Database connected')
}).catch(() => {
    console.log('Failed to connect')
})

const blockRouter = require('./routes/block.js');
const workspaceRouter = require('./routes/workspace.js');

app.use('/block', blockRouter);
app.use('/workspace', workspaceRouter);

app.use(express.static(__dirname + '/public'));


io.on('connection', socket => {
    socket.on("join room", roomID => {
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
    });

    socket.on('canvas-data', (data)=> {
        socket.broadcast.emit('canvas-data', data);
    })
});

app.get('/', (req, res) => {
    res.send('hello');
})

server.listen(8000, () => console.log('server is running on port 8000'));