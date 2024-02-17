const http = require('http');
const express = require('express');
const path = require('path');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    path: '/chat/socket.io',
    cors: {
        origin: "http://localhost:5173", //your frontend project port
        credentials: true
    }
});


io.on('connection', (socket) => {
    console.log('socket connected')
    socket.on("user-message", (data) => {
        const abc = {
            msg : data.message,
            id: socket.id
        }
        io.emit('message', abc);
    });
});


app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
    return res.sendFile("/public/index.html");
});

server.listen(9000, () => {
    console.log(`Server connected on PORT 9000`);
});


