var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

eval(fs.readFileSync('./public/js/config.js')+'');

app.use(express.static("public"));

io.on('connection', function(socket){
	console.log("SOCKET ID", socket.id);
});

http.listen(3000);
