const express = require("express");
const path = require("path");
require('dotenv').config();
// const hostname = '192.168.29.49';
var PORT = process.env.PORT || 5000;
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);
app.use(express.static(path.join(__dirname + "/public")));
io.on("connection", function(socket) {
    socket.on("newuser", function(username) {
        socket.broadcast.emit("update", username + " joined");
    });
    socket.on("exituser", function(username) {
        socket.broadcast.emit("update", username + " left");
    });
    socket.on("chat", function(message) {
        socket.broadcast.emit("chat", message);
    });
});
server.listen(PORT, () => {
    console.log(`app listening at ${PORT}`)
});