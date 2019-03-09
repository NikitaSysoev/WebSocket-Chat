const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

app.use(express.static(path.join('../', 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join('../', 'build', 'index.html'));
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
});

module.exports = http;
