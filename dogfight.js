var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

var IS_SERVER = true;

eval(fs.readFileSync('./server/UniqueNumber.js')+'');
eval(fs.readFileSync('./public/js/config.js')+'');
eval(fs.readFileSync('./server/Game.js')+'');
eval(fs.readFileSync('./public/js/Player.js')+'');

var playerIdGenerator = new UniqueNumber(1);
var game = new Game();


eval(fs.readFileSync('./server/socket.js')+'');

app.use(express.static("public"));



http.listen(3000);
