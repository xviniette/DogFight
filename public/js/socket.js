$(function(){
	var socket = io();

	socket.on("login", function(data){
		socket.emit("login", {pseudo:"lol"});
	});

	socket.on("playerID", function(data){
		client.pid = data;
		console.log(client);
	});
});