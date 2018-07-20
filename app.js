const express = require('express');
const app = express();

app.use(express.static(__dirname + "/public"));
const server = app.listen(8000);

const io = require('socket.io')(server);

io.on('connect', function(socket) {
    io.emit('new_connection', socket.id)

    socket.on('disconnect', function(socket) {
        io.emit('disconnected_user', this.id);
    })

    socket.on('trigger_notification', function(socket){
        io.emit('notification', this.id);
    })
})

