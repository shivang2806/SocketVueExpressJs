const http = require('http');
const express = require('express');
const path = require('path');
const Message = require("./models/messageModel");
const {Server} = require('socket.io');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const errorHandling = require('./middleware/errorHandling');
const asyncHandler = require("express-async-handler");

connectDb();

const app = express();
app.use(express.json());
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandling);
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
        saveMessage(data);
        const abc = {
            msg : data.message,
            id: data.message.to
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


const saveMessage = asyncHandler( async (data) => {

    const user = await Message.create({
        from: data.message.from, 
        to: data.message.to,
        message: data.message.message
    });

});